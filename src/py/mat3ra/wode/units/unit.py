from typing import Any, Dict, List

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit.base import WorkflowBaseUnitSchema
from mat3ra.utils import (
    calculate_hash_from_object,
    remove_comments_from_source_code,
    remove_empty_lines_from_string,
)
from mat3ra.utils.uuid import get_uuid
from pydantic import Field


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
    id: str = Field(default_factory=get_uuid, alias="_id")
    flowchartId: str = Field(default_factory=get_uuid)
    # TODO: use RuntimeItemNameObjectSchema when available
    preProcessors: List[Any] = Field(default_factory=list)
    postProcessors: List[Any] = Field(default_factory=list)
    monitors: List[Any] = Field(default_factory=list)
    results: List[Any] = Field(default_factory=list)
    context: Dict[str, Any] = Field(default_factory=dict)

    @staticmethod
    def _compact_dict(obj: Dict[str, Any]) -> Dict[str, Any]:
        return {k: v for k, v in obj.items() if v is not None}

    @staticmethod
    def _to_plain_dict(obj: Any) -> Dict[str, Any]:
        if callable(getattr(obj, "to_dict", None)):
            return obj.to_dict()
        if isinstance(obj, dict):
            return obj
        return {}

    @staticmethod
    def _pick(obj: Dict[str, Any], *keys: str) -> Dict[str, Any]:
        return Unit._compact_dict({k: obj.get(k) for k in keys})

    @staticmethod
    def _hash_input_content(input_items: Any) -> str:
        items = input_items if isinstance(input_items, list) else []
        object_for_hashing = [
            remove_empty_lines_from_string(remove_comments_from_source_code(i.get("content", "")))
            for i in items
            if isinstance(i, dict)
        ]
        return calculate_hash_from_object(object_for_hashing)

    def get_hash_object(self) -> Dict[str, Any]:
        return {
            "results": self.results or [],
            "preProcessors": self.preProcessors or [],
            "postProcessors": self.postProcessors or [],
            "type": self.type,
        }

    def calculate_hash(self) -> str:
        return calculate_hash_from_object(self.get_hash_object())

    def is_in_status(self, status: str) -> bool:
        return self.status == status

    def add_context(self, new_context: Dict[str, Any]):
        self.context.update(new_context)

    def set_context(self, new_context: Dict[str, Any]):
        self.context = new_context

    def get_context(self, key: str, default: Any = None) -> Any:
        return self.context.get(key, default)

    def remove_context(self, key: str):
        self.context.pop(key, None)

    def clear_context(self):
        self.context = {}
