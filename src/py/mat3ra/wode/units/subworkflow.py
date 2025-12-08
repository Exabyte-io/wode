from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit.subworkflow import SubworkflowUnitSchema


class SubworkflowUnit(SubworkflowUnitSchema, InMemoryEntitySnakeCase):
    name: str = "New Subworkflow"
