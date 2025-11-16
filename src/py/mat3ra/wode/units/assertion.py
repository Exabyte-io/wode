"""Assertion unit class."""

from typing import Literal, Optional

from pydantic import Field

from ..enums import UnitType
from .base import BaseUnit


class AssertionUnit(BaseUnit):
    """
    Assertion unit for validating expressions.

    This unit type asserts that an expression evaluates to true.
    """

    type: Literal[UnitType.ASSERTION] = Field(default=UnitType.ASSERTION)
    expression: Optional[str] = Field(default=None, description="Expression to assert")
