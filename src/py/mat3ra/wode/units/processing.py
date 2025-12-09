from typing import Any

from mat3ra.esse.models.workflow.unit.processing import ProcessingUnitSchema

from .unit import Unit


class ProcessingUnit(ProcessingUnitSchema, Unit):
    def set_operation(self, op: Any):
        raise NotImplementedError

    def set_operation_type(self, type: str):
        raise NotImplementedError

    def set_input(self, input: Any):
        raise NotImplementedError
