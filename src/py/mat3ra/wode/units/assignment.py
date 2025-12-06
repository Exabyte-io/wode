from typing import Any, List

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit.assignment import AssignmentUnitSchema
from pydantic import Field


class AssignmentUnit(AssignmentUnitSchema, InMemoryEntitySnakeCase):
    operand: str = "X"
    value: str = "1"
    input: List[Any] = Field(default_factory=list)

