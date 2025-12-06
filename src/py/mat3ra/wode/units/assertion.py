from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit.assertion import AssertionUnitSchema


class AssertionUnit(AssertionUnitSchema, InMemoryEntitySnakeCase):
    statement: str = "true"
    errorMessage: str = "assertion failed"

