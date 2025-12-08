from typing import List, Optional

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow import WorkflowSchema
from pydantic import Field

from ..subworkflows import Subworkflow
from ..units import Unit


class Workflow(WorkflowSchema, InMemoryEntitySnakeCase):
    """
    Workflow class representing a complete workflow configuration.

    Attributes:
        name: Name of the workflow
        subworkflows: List of subworkflows in the workflow
        units: List of units linking the subworkflows
        properties: List of properties extracted by the workflow
    """

    subworkflows: List[Subworkflow] = Field(default_factory=list)
    units: List[Unit] = Field(default_factory=list)
    isMultiMaterial: bool = Field(default=False)

    @classmethod
    def create(cls, config: dict) -> "Workflow":
        raise NotImplementedError

    @classmethod
    def from_subworkflow(cls, subworkflow: Subworkflow) -> "Workflow":
        raise NotImplementedError

    @classmethod
    def from_subworkflows(cls, name: str, *subworkflows: Subworkflow) -> "Workflow":
        raise NotImplementedError

    def add_subworkflow(self, subworkflow: Subworkflow, head: bool = False, index: int = -1):
        raise NotImplementedError

    def remove_subworkflow_by_id(self, id: str):
        raise NotImplementedError

    def set_units(self, units: List[Unit]):
        raise NotImplementedError

    def get_unit_by_name(self, name: Optional[str] = None, name_regex: Optional[str] = None) -> Optional[Unit]:
        raise NotImplementedError

    def set_unit(self, unit: Optional[Unit] = None, unit_flowchart_id: Optional[str] = None, new_unit: Optional[Unit] = None) -> bool:
        raise NotImplementedError

    @property
    def is_multimaterial(self) -> bool:
        raise NotImplementedError

    def add_unit(self, unit: Unit, head: bool = False, index: int = -1):
        raise NotImplementedError

    def remove_unit(self, flowchart_id: str):
        raise NotImplementedError

    def add_unit_type(self, unit_type: str, head: bool = False, index: int = -1):
        raise NotImplementedError

    @property
    def relaxation_subworkflow(self) -> Optional[Subworkflow]:
        raise NotImplementedError

    def is_relaxation_subworkflow(self, subworkflow: Subworkflow) -> bool:
        raise NotImplementedError

    @property
    def has_relaxation(self) -> bool:
        raise NotImplementedError

    def toggle_relaxation(self):
        raise NotImplementedError

    def add_relaxation(self):
        raise NotImplementedError
