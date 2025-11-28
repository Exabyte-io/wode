"""Execution unit class."""

from typing import Any, Dict, Literal, Optional

from pydantic import Field

from ..enums import UnitType
from .base import BaseUnit


class ExecutionUnit(BaseUnit):
    """
    Execution unit for running applications.

    This unit type executes an application with specific parameters.
    """

    type: Literal[UnitType.EXECUTION] = Field(default=UnitType.EXECUTION)
    application: Optional[Dict[str, Any]] = Field(default=None, description="Application to execute")
    executable: Optional[Dict[str, Any]] = Field(default=None, description="Executable configuration")
    flavor: Optional[Dict[str, Any]] = Field(default=None, description="Flavor configuration")
    preProcessors: list = Field(default_factory=list, description="Pre-processors to run")
    postProcessors: list = Field(default_factory=list, description="Post-processors to run")
    monitors: list = Field(default_factory=list, description="Monitors to use")
    results: list = Field(default_factory=list, description="Results produced by the unit")
