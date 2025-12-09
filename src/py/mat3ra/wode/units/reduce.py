from typing import List

from mat3ra.esse.models.workflow.unit.reduce import ReduceUnitSchema, InputItem
from pydantic import Field

from .unit import Unit


class ReduceUnit(Unit, ReduceUnitSchema):
    mapFlowchartId: str = Field(default="")
    input: List[InputItem] = Field(default_factory=list)
