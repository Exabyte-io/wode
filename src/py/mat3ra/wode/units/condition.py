from typing import Any, List, Optional

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit.condition import ConditionUnitSchema
from pydantic import Field


class ConditionUnit(ConditionUnitSchema, InMemoryEntitySnakeCase):
    input: List[Any] = Field(default_factory=list)
    results: List[Any] = Field(default_factory=list)
    preProcessors: List[Any] = Field(default_factory=list)
    postProcessors: List[Any] = Field(default_factory=list)
    statement: str = "true"
    maxOccurrences: int = 100
    then: Optional[str] = None
    else_: Optional[str] = Field(default=None, alias="else")

