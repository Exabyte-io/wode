from typing import Any, Dict, List, Literal

from mat3ra.ade import Application, Executable, Flavor
from mat3ra.esse.models.workflow.unit.execution import ExecutionUnitSchemaBase
from mat3ra.standata.applications import ApplicationStandata
from mat3ra.utils import (
    remove_comments_from_source_code,
    remove_empty_lines_from_string,
)
from mat3ra.utils import remove_timestampable_keys, calculate_hash_from_object
from pydantic import Field

from .unit import Unit


class ExecutionUnit(Unit, ExecutionUnitSchemaBase):
    type: Literal["execution"] = "execution"
    executable: Executable = None
    flavor: Flavor = None
    application: Application = None
    input: List = Field(default_factory=list)

    @staticmethod
    def _input_items_for_hash(input_items: Any) -> str:
        items = input_items if isinstance(input_items, list) else []
        object_for_hashing = [
            remove_empty_lines_from_string(remove_comments_from_source_code(i.get("content", "")))
            for i in items
            if isinstance(i, dict)
        ]
        return calculate_hash_from_object(object_for_hashing)

    def get_hash_object(self) -> Dict[str, Any]:
        application = self.application
        executable = self.executable
        flavor = self.flavor

        app = (
            application.to_dict()
            if callable(getattr(application, "to_dict", None))
            else (application or {})
        )
        exe = (
            executable.to_dict()
            if callable(getattr(executable, "to_dict", None))
            else (executable or {})
        )
        flv = (
            flavor.to_dict() if callable(getattr(flavor, "to_dict", None)) else (flavor or {})
        )

        app = dict(app) if isinstance(app, dict) else {}
        exe = dict(exe) if isinstance(exe, dict) else {}
        flv = dict(flv) if isinstance(flv, dict) else {}

        app_name, exe_name = app.get("name"), exe.get("name")
        if app_name and exe_name and not exe.get("results"):
            exe_full = ApplicationStandata.get_app_tree_for_application(app_name).get(exe_name) or {}
            if isinstance(exe_full, dict) and exe_full.get("results"):
                exe["results"] = exe_full["results"]

        return {
            **super().get_hash_object(),
            "application": remove_timestampable_keys(app),
            "executable": remove_timestampable_keys(exe),
            "flavor": remove_timestampable_keys(flv),
            "input": self._input_items_for_hash(self.input),
        }
