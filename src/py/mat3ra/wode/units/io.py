from typing import List

from mat3ra.esse.models.workflow.unit.io import DataIOUnitSchema
from pydantic import Field

from .unit import Unit


class IOUnit(Unit, DataIOUnitSchema):
    subtype: str = Field(default="input")
    source: str = Field(default="")
    input: List = Field(default_factory=list)
    def set_materials(self, materials: List):
        raise NotImplementedError

    def add_feature(self, feature: str):
        raise NotImplementedError

    def remove_feature(self, feature: str):
        raise NotImplementedError

    def add_target(self, target: str):
        raise NotImplementedError

    def remove_target(self, target: str):
        raise NotImplementedError

    def has_feature(self, feature: str) -> bool:
        raise NotImplementedError

    def has_target(self, target: str) -> bool:
        raise NotImplementedError
