from mat3ra.esse.models.workflow.unit.condition import ConditionUnitSchema
from pydantic import Field

from .unit import Unit


class ConditionUnit(Unit, ConditionUnitSchema):
    statement: str = Field(default="")
    then: str = Field(default="")
    else_: str = Field(default="", alias="else")
    input: list = Field(default_factory=list)
    max_occurrences: int = Field(default=1)
