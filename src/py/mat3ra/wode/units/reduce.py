from typing import Any, List

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit.reduce import ReduceUnitSchema
from pydantic import Field


class ReduceUnit(ReduceUnitSchema, InMemoryEntitySnakeCase):
    mapFlowchartId: str = ""
    input: List[Any] = Field(default_factory=list)

