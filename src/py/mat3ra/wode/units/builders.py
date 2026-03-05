from __future__ import annotations

from functools import lru_cache
from typing import Any, Dict

from mat3ra.standata.applications import ApplicationStandata


@lru_cache
def _get_app_tree(app_name: str) -> Dict[str, Any]:
    return ApplicationStandata.get_app_tree_for_application(app_name)


def build_execution_unit_config(config: Dict[str, Any]) -> Dict[str, Any]:
    app = config.get("application") if isinstance(config.get("application"), dict) else {}
    exe = config.get("executable") if isinstance(config.get("executable"), dict) else {}

    app_name = app.get("name")
    exe_name = exe.get("name")
    if not app_name or not exe_name or exe.get("results"):
        return config

    exe_full = _get_app_tree(app_name).get(exe_name) or {}
    results = exe_full.get("results") if isinstance(exe_full, dict) else None
    if not results:
        return config

    updated = dict(config)
    updated["executable"] = {**exe, "results": results}
    return updated
