from typing import Any, Dict, List

from mat3ra.ade import Application, Executable, Flavor
from mat3ra.esse.models.workflow.unit.execution import ExecutionUnitSchemaBase
from mat3ra.utils import calculate_hash_from_object
from pydantic import Field

from .unit import Unit


class ExecutionUnit(Unit, ExecutionUnitSchemaBase):
    executable: Executable = None
    flavor: Flavor = None
    application: Application = None
    input: List = Field(default_factory=list)

    @property
    def hash_from_array_input_content(self) -> str:
        return Unit._hash_input_content(self.input)
