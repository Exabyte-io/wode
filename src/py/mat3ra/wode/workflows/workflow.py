from typing import List, Optional

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow import WorkflowSchema
from mat3ra.standata.subworkflows import SubworkflowStandata
from pydantic import Field

from ..subworkflows import Subworkflow
from ..units import Unit
from ..utils import find_by_instance_or_id, find_by_name_or_regex, generate_uuid


class Workflow(WorkflowSchema, InMemoryEntitySnakeCase):
    """
    Workflow class representing a complete workflow configuration.

    Attributes:
        name: Name of the workflow
        subworkflows: List of subworkflows in the workflow
        units: List of units linking the subworkflows
        properties: List of properties extracted by the workflow
    """

    field_id: str = Field(default_factory=generate_uuid, alias="_id")
    subworkflows: List[Subworkflow] = Field(default_factory=list)
    units: List[Unit] = Field(default_factory=list)
    isMultiMaterial: bool = Field(default=False)

    @property
    def application(self):
        if not self.subworkflows or len(self.subworkflows) == 0:
            return None

        first_subworkflow = self.subworkflows[0]
        return first_subworkflow.application if first_subworkflow.application else None

    @classmethod
    def from_subworkflow(cls, subworkflow: Subworkflow) -> "Workflow":
        raise NotImplementedError

    @classmethod
    def from_subworkflows(cls, name: str, *subworkflows: Subworkflow) -> "Workflow":
        raise NotImplementedError

    @property
    def is_multimaterial(self) -> bool:
        raise NotImplementedError

    @property
    def properties(self) -> List[str]:
        raise NotImplementedError

    @property
    def all_subworkflows(self) -> List[Subworkflow]:
        raise NotImplementedError

    @property
    def relaxation_subworkflow(self) -> Optional[Subworkflow]:
        raise NotImplementedError

    @property
    def has_relaxation(self) -> bool:
        raise NotImplementedError

    # TODO: implement for MIN notebook
    def add_subworkflow(self, subworkflow: Subworkflow, head: bool = False, index: int = -1):
        raise NotImplementedError

    def remove_subworkflow_by_id(self, id: str):
        raise NotImplementedError

    def replace_subworkflow_at_index(self, index: int, new_subworkflow: Subworkflow):
        raise NotImplementedError

    def find_subworkflow_by_id(self, id: str) -> Optional[Subworkflow]:
        raise NotImplementedError

    def set_units(self, units: List[Unit]):
        raise NotImplementedError

    def get_unit_by_name(self, name: Optional[str] = None, name_regex: Optional[str] = None) -> Optional[Unit]:
        return find_by_name_or_regex(self.units, name=name, name_regex=name_regex)

    def set_unit(
            self,
            new_unit: Unit,
            unit: Optional[Unit] = None,
            unit_flowchart_id: Optional[str] = None,
    ) -> bool:
        target_unit = find_by_instance_or_id(
            self.units,
            instance=unit,
            instance_id=unit_flowchart_id,
            id_attribute="flowchartId"
        )

        try:
            unit_index = self.units.index(target_unit)
        except ValueError:
            return False

        self.units[unit_index] = new_unit
        return True

    def set_context_to_unit(self, unit_name: Optional[str] = None, unit_name_regex: Optional[str] = None,
                            new_context: Optional[Dict[str, Any]] = None):
        target_unit = self.get_unit_by_name(name=unit_name, name_regex=unit_name_regex)
        target_unit.context = new_context

    def add_unit(self, unit: Unit, head: bool = False, index: int = -1):
        raise NotImplementedError

    def remove_unit(self, flowchart_id: str):
        raise NotImplementedError

    def add_unit_type(self, unit_type: str, head: bool = False, index: int = -1):
        raise NotImplementedError

    @property
    def relaxation_subworkflow(self) -> Optional[Subworkflow]:
        application_name = self.application.name
        subworkflow_standata = SubworkflowStandata()
        relaxation_data = subworkflow_standata.get_relaxation_subworkflow_by_application(application_name)

        if not relaxation_data:
            return None

        return Subworkflow(**relaxation_data)

    def is_relaxation_subworkflow(self, subworkflow: Subworkflow) -> bool:
        relaxation = self.relaxation_subworkflow
        if not relaxation:
            return False

        return subworkflow.name == relaxation.name

    @property
    def has_relaxation(self) -> bool:
        for subworkflow in self.subworkflows:
            if self.is_relaxation_subworkflow(subworkflow):
                return True
        return False

    def toggle_relaxation(self):
        if self.has_relaxation:
            relaxation_subworkflow = None
            for subworkflow in self.subworkflows:
                if self.is_relaxation_subworkflow(subworkflow):
                    relaxation_subworkflow = subworkflow
                    break

            if relaxation_subworkflow:
                self.remove_subworkflow_by_id(relaxation_subworkflow.id)
        else:
            relaxation = self.relaxation_subworkflow
            if relaxation:
                self.add_subworkflow(relaxation, head=True)

    def add_relaxation(self):
        if not self.has_relaxation:
            self.toggle_relaxation()
