from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit.subworkflow import SubworkflowUnitSchema

from mat3ra.wode import UnitType


class SubworkflowUnit(SubworkflowUnitSchema, InMemoryEntitySnakeCase):
    name: str = "New Subworkflow"

