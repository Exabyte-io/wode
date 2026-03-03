from typing import Any, Dict, List

from mat3ra.ade import Application, Executable, Flavor
from mat3ra.esse.models.workflow.unit.execution import ExecutionUnitSchemaBase
from mat3ra.standata.applications import ApplicationStandata
from mat3ra.utils import remove_timestampable_keys
from pydantic import Field, model_validator

from .unit import Unit


EXECUTABLE_FLAVOR_MAP_BY_APPLICATION = ApplicationStandata.get_all_app_tree()


class ExecutionUnit(Unit, ExecutionUnitSchemaBase):
    executable: Executable = None
    flavor: Flavor = None
    application: Application = None
    input: List = Field(default_factory=list)

    @staticmethod
    def _pick_default_name(options_by_name: Any) -> str | None:
        options = options_by_name if isinstance(options_by_name, dict) else {}
        for name, cfg in options.items():
            if isinstance(cfg, dict) and cfg.get("isDefault") is True:
                return name
        for name in options.keys():
            return name
        return None

    @staticmethod
    def _fill_missing(target: Dict[str, Any], source: Dict[str, Any], keys: tuple[str, ...]) -> None:
        for key in keys:
            if key not in source:
                continue
            if target.get(key) in (None, [], {}):
                target[key] = source[key]

    @model_validator(mode="before")
    @classmethod
    def _expand_executable_and_flavor_from_standata(cls, data):
        if not isinstance(data, dict):
            return data

        app = data.get("application") if isinstance(data.get("application"), dict) else {}
        exe = data.get("executable") if isinstance(data.get("executable"), dict) else {}
        flv = data.get("flavor") if isinstance(data.get("flavor"), dict) else {}

        app_name = app.get("name")
        app_tree = EXECUTABLE_FLAVOR_MAP_BY_APPLICATION.get(app_name, {}) if app_name else {}

        exe_name = exe.get("name") or cls._pick_default_name(app_tree)
        if exe_name:
            exe.setdefault("name", exe_name)

        exe_full = app_tree.get(exe_name, {}) if exe_name else {}
        if isinstance(exe_full, dict) and exe_full:
            cls._fill_missing(
                exe,
                exe_full,
                ("hasAdvancedComputeOptions", "isDefault", "monitors", "postProcessors", "results"),
            )

            flavors = exe_full.get("flavors") if isinstance(exe_full.get("flavors"), dict) else {}
            flv_name = flv.get("name") or cls._pick_default_name(flavors)
            if flv_name:
                flv.setdefault("name", flv_name)

            flv_full = flavors.get(flv_name, {}) if flv_name else {}
            if isinstance(flv_full, dict) and flv_full:
                cls._fill_missing(
                    flv,
                    flv_full,
                    ("applicationName", "executableName", "input", "isDefault", "monitors", "results"),
                )

        data["executable"] = exe
        data["flavor"] = flv
        return data

    @property
    def hash_from_array_input_content(self) -> str:
        return Unit._hash_input_content(self.input)

    def get_hash_object(self) -> Dict[str, Any]:
        app = self._to_plain_dict(self.application)
        exe = self._to_plain_dict(self.executable)
        flv = self._to_plain_dict(self.flavor)
        return {
            **super().get_hash_object(),
            "application": remove_timestampable_keys(app),
            "executable": remove_timestampable_keys(exe),
            "flavor": remove_timestampable_keys(flv),
            "input": self.hash_from_array_input_content,
        }
