from typing import Any, Dict

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit.map import MapUnitSchema
from pydantic import Field


class MapUnit(MapUnitSchema, InMemoryEntitySnakeCase):
    workflowId: str = ""
    input: Dict[str, Any] = Field(
        default_factory=lambda: {
            "target": "MAP_DATA",
            "scope": "global",
            "name": "",
            "values": [],
            "useValues": False,
        }
    )

    def set_workflow_id(self, id: str):
        raise NotImplementedError
