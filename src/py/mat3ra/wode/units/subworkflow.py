from typing import Optional, get_args

from mat3ra.esse.models.workflow.unit.subworkflow import SubworkflowUnitSchema
from pydantic import Field

from .unit import Unit


class SubworkflowUnit(Unit, SubworkflowUnitSchema):
    type: Optional[str] = Field(default=get_args(SubworkflowUnitSchema.model_fields["type"].annotation)[0])
