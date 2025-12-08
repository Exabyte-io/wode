from typing import Any

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit.processing import ProcessingUnitSchema


class ProcessingUnit(ProcessingUnitSchema, InMemoryEntitySnakeCase):
    def set_operation(self, op: Any):
        raise NotImplementedError

    def set_operation_type(self, type: str):
        raise NotImplementedError

    def set_input(self, input: Any):
        raise NotImplementedError
