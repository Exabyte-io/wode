from typing import Any, Dict, List, Literal

from mat3ra.ade import Application, Executable, Flavor
from mat3ra.esse.models.workflow.unit.execution import ExecutionUnitSchemaBase
from mat3ra.standata.applications import ApplicationStandata
from mat3ra.utils import remove_timestampable_keys
from pydantic import Field

from .unit import Unit


EXECUTABLE_FLAVOR_MAP_BY_APPLICATION = ApplicationStandata.get_all_app_tree()


class ExecutionUnit(Unit, ExecutionUnitSchemaBase):
    type: Literal["execution"] = "execution"
    executable: Executable = None
    flavor: Flavor = None
    application: Application = None
    input: List = Field(default_factory=list)


    @property
    def hash_from_array_input_content(self) -> str:
        return Unit._hash_input_content(self.input)

    def get_hash_object(self) -> Dict[str, Any]:
        app = self._to_plain_dict(self.application)
        exe = self._to_plain_dict(self.executable)
        flv = self._to_plain_dict(self.flavor)

        hash_object = {
            **super().get_hash_object(),
            "application": remove_timestampable_keys(app),
            "executable": remove_timestampable_keys(exe),
            "flavor": remove_timestampable_keys(flv),
            "input": self.hash_from_array_input_content,
        }
        print(f"Hash object for execution unit '{self.name}': {hash_object}")
        return hash_object
