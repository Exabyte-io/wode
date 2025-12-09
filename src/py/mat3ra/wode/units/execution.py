from typing import Dict, List

from mat3ra.esse.models.workflow.unit.execution import ExecutionUnitSchemaBase
from pydantic import Field

from .unit import Unit


class ExecutionUnit(Unit, ExecutionUnitSchemaBase):
    executable: Dict = Field(default_factory=dict)
    flavor: Dict = Field(default_factory=dict)
    application: Dict = Field(default_factory=dict)
    input: List = Field(default_factory=list)
