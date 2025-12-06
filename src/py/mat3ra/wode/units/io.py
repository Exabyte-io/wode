from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit.io import DataIOUnitSchema


class IOUnit(DataIOUnitSchema, InMemoryEntitySnakeCase):
    subtype: str = "input"

