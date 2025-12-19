from typing import Any, Dict, List, Optional

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow import WorkflowSchema
from mat3ra.standata.subworkflows import SubworkflowStandata
from mat3ra.utils.uuid import get_uuid
from pydantic import Field

from ..mixins import FlowchartUnitsManager
from ..subworkflows import Subworkflow
from ..units import Unit


class Workflow(WorkflowSchema, InMemoryEntitySnakeCase, FlowchartUnitsManager):
    """
    Workflow class representing a complete workflow configuration.

    Attributes:
        name: Name of the workflow
        subworkflows: List of subworkflows in the workflow
        units: List of units linking the subworkflows
        properties: List of properties extracted by the workflow
    """

    id: str = Field(default_factory=get_uuid, alias="_id")
    subworkflows: List[Subworkflow] = Field(default_factory=list)
    units: List[Unit] = Field(default_factory=list)
    isMultiMaterial: bool = Field(default=False)
    isUsingDataset: bool = Field(default=False)
    isDefault: bool = Field(default=False)

    @property
    def application(self):
        if not self.subworkflows or len(self.subworkflows) == 0:
            return None

        first_subworkflow = self.subworkflows[0]
        return first_subworkflow.application if first_subworkflow.application else None

    @property
    def relaxation_subworkflow(self) -> Optional[Subworkflow]:
        application_name = self.application.name if self.application else None
        subworkflow_standata = SubworkflowStandata()
        relaxation_data = subworkflow_standata.get_relaxation_by_application(application_name)
        return Subworkflow(**relaxation_data) if relaxation_data else None

    @property
    def has_relaxation(self) -> bool:
        return self._find_relaxation_subworkflow() is not None

    def add_subworkflow(self, subworkflow: Subworkflow, head: bool = False, index: int = -1):
        self._add_to_list(self.subworkflows, subworkflow, head, index)
        unit = subworkflow.get_as_unit()
        self.add_unit(unit, head, index)

    def remove_subworkflow_by_id(self, id: str):
        self.subworkflows = [sw for sw in self.subworkflows if sw.id != id]

    def find_subworkflow_by_id(self, id: str) -> Optional[Subworkflow]:
        return next((sw for sw in self.subworkflows if sw.id == id), None)

    def set_context_to_unit(
        self,
        unit_name: Optional[str] = None,
        unit_name_regex: Optional[str] = None,
        new_context: Optional[Dict[str, Any]] = None,
    ):
        target_unit = self.get_unit_by_name(name=unit_name, name_regex=unit_name_regex)
        target_unit.context = new_context

    def _find_relaxation_subworkflow(self) -> Optional[Subworkflow]:
        target_name = self.relaxation_subworkflow.name

        return next(
            (swf for swf in self.subworkflows if swf.name == target_name),
            None,
        )

    def add_relaxation(self) -> None:
        if self.has_relaxation:
            return

        relaxation_definition = self.relaxation_subworkflow
        if relaxation_definition is not None:
            self.add_subworkflow(relaxation_definition, head=True)

    def remove_relaxation(self) -> None:
        existing = self._find_relaxation_subworkflow()
        if existing is not None:
            self.remove_subworkflow_by_id(existing.id)
