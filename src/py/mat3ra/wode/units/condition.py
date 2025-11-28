"""Condition unit class."""

from typing import Literal, Optional

from pydantic import Field

from ..enums import UnitType
from .base import BaseUnit


class ConditionUnit(BaseUnit):
    """
    Condition unit for evaluating conditions.

    This unit type evaluates conditions to control workflow flow.
    """

    type: Literal[UnitType.CONDITION] = Field(default=UnitType.CONDITION)
    condition: Optional[str] = Field(default=None, description="Condition to evaluate")
