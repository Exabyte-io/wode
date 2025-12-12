from mat3ra.esse.models.workflow.unit.map import MapUnitSchema
from pydantic import Field

from .unit import Unit


class MapUnit(Unit, MapUnitSchema):
    workflowId: str = Field(default="")
    input: list = Field(default_factory=list)
    def set_workflow_id(self, id: str):
        raise NotImplementedError
