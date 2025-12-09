from mat3ra.esse.models.workflow.unit.reduce import ReduceUnitSchema
from pydantic import Field

from .unit import Unit


class ReduceUnit(Unit, ReduceUnitSchema):
    mapFlowchartId: str = Field(default="")
    input: list = Field(default_factory=list)
