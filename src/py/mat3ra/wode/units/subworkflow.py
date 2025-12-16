from typing import Optional

from mat3ra.esse.models.workflow.unit.subworkflow import SubworkflowUnitSchema

from .unit import Unit


class SubworkflowUnit(Unit, SubworkflowUnitSchema):
    type: Optional[str] = SubworkflowUnitSchema.model_fields['type'].default
