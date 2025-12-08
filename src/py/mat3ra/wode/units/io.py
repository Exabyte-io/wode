from typing import List

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit.io import DataIOUnitSchema


class IOUnit(DataIOUnitSchema, InMemoryEntitySnakeCase):
    subtype: str = "input"

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
