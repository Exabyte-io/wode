from typing import Any, Dict, List

from mat3ra.ade import Application, Executable, Flavor
from mat3ra.code.utils import (
    calculate_hash_from_object,
    remove_comments_from_source_code,
    remove_empty_lines_from_string,
    remove_timestampable_keys,
)
from mat3ra.esse.models.workflow.unit.execution import ExecutionUnitSchemaBase
from pydantic import Field

from .unit import Unit


class ExecutionUnit(Unit, ExecutionUnitSchemaBase):
    executable: Executable = None
    flavor: Flavor = None
    application: Application = None
    input: List = Field(default_factory=list)

    @property
    def hash_from_array_input_content(self) -> str:
        object_for_hashing = [
            remove_empty_lines_from_string(remove_comments_from_source_code(i.get("content", "")))
            for i in self.input
        ]
        return calculate_hash_from_object(object_for_hashing)

    def get_hash_object(self) -> Dict[str, Any]:
        # mirrors JS: BaseUnit.getHashObject spreads hashObjectFromRuntimeItems + type,
        # then ExecutionUnit extends with application/executable/flavor/input
        return {
            "results": self.results or [],
            "preProcessors": self.preProcessors or [],
            "postProcessors": self.postProcessors or [],
            "type": self.type,
            "application": remove_timestampable_keys(self.application.to_dict() if self.application else {}),
            "executable": remove_timestampable_keys(self.executable.to_dict() if self.executable else {}),
            "flavor": remove_timestampable_keys(self.flavor.to_dict() if self.flavor else {}),
            "input": self.hash_from_array_input_content,
        }

    def calculate_hash(self) -> str:
        return calculate_hash_from_object(self.get_hash_object())
