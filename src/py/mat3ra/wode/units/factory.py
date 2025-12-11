from typing import Dict

from .unit import Unit


class UnitFactory:
    # TODO: implement for MIN notebook
    @staticmethod
    def create(config: Dict) -> Unit:
        raise NotImplementedError
