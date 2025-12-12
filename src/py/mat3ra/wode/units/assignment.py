from typing import List

from mat3ra.esse.models.workflow.unit.assignment import AssignmentUnitSchema, WorkflowUnitInputSchema
from pydantic import Field

from .unit import Unit


class AssignmentUnit(Unit, AssignmentUnitSchema):
    input: List[WorkflowUnitInputSchema] = Field(default_factory=list)
