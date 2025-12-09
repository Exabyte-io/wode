from typing import Any, Dict

from mat3ra.esse.models.workflow.unit.processing import ProcessingUnitSchema
from pydantic import Field

from .unit import Unit


class ProcessingUnit(Unit, ProcessingUnitSchema):
    operation: str = Field(default="")
    operationType: str = Field(default="")
    inputData: list = Field(default_factory=list)
    def set_operation(self, op: Any):
        raise NotImplementedError

    def set_operation_type(self, type: str):
        raise NotImplementedError

    def set_input(self, input: Any):
        raise NotImplementedError
