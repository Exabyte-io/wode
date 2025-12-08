from typing import Any, Dict, List

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit.base import RuntimeItemNameObjectSchema, WorkflowBaseUnitSchema
from pydantic import Field

from ..utils import generate_uuid


class Unit(WorkflowBaseUnitSchema, InMemoryEntitySnakeCase):
    """
    Unit class representing a unit of computational work in a workflow.

    Attributes:
        type: Type of the unit (e.g., execution, assignment, condition)
        name: Name of the unit
        flowchartId: Unique identifier for the unit in the flowchart
        head: Whether this unit is the head of the workflow
        next: Flowchart ID of the next unit
        tags: List of tags for the unit
        context: Context data dictionary for the unit
    """

    flowchartId: str = Field(default_factory=generate_uuid)
    preProcessors: List[RuntimeItemNameObjectSchema] = Field(default_factory=list)
    postProcessors: List[RuntimeItemNameObjectSchema] = Field(default_factory=list)
    monitors: List[RuntimeItemNameObjectSchema] = Field(default_factory=list)
    results: List[RuntimeItemNameObjectSchema] = Field(default_factory=list)
    context: Dict[str, Any] = Field(default_factory=dict)

    def is_in_status(self, status: str) -> bool:
        raise NotImplementedError

    # TODO: implement for MIN notebook
    def add_context(self, new_context: Dict[str, Any]):
        raise NotImplementedError

    def get_context(self, key: str, default: Any = None) -> Any:
        raise NotImplementedError

    def remove_context(self, key: str):
        raise NotImplementedError

    def clear_context(self):
        raise NotImplementedError
