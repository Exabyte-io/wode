from typing import Optional

from mat3ra.esse.models.workflow.unit.subworkflow import SubworkflowUnitSchema

from ..utils import field_from_schema
from .unit import Unit


class SubworkflowUnit(Unit, SubworkflowUnitSchema):
    type: Optional[str] = field_from_schema(SubworkflowUnitSchema, "type")
