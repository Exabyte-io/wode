from typing import List

from mat3ra.esse.models.workflow.unit.io import DataIOUnitSchema
from pydantic import Field

from mat3ra.wode.units.unit import Unit


class IOUnit(Unit, DataIOUnitSchema):
    source: str = Field(default="")
    input: List = Field(default_factory=list)

    def set_materials(self, materials: List):
        raise NotImplementedError
