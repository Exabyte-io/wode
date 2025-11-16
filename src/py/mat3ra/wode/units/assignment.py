"""Assignment unit class."""

from typing import Any, Literal, Optional

from pydantic import Field

from ..enums import UnitType
from .base import BaseUnit


class AssignmentUnit(BaseUnit):
    """
    Assignment unit for setting values.

    This unit type assigns values to variables in the workflow context.
    """

    type: Literal[UnitType.ASSIGNMENT] = Field(default=UnitType.ASSIGNMENT)
    value: Optional[Any] = Field(default=None, description="Value to assign")
    operand: Optional[str] = Field(default=None, description="Target operand")
