"""Reduce unit class."""

from typing import Literal, Optional

from pydantic import Field

from ..enums import UnitType
from .base import BaseUnit


class ReduceUnit(BaseUnit):
    """
    Reduce unit for collecting results.

    This unit type collects and combines results from fanned out operations.
    """

    type: Literal[UnitType.REDUCE] = Field(default=UnitType.REDUCE)
    operation: Optional[str] = Field(default=None, description="Reduce operation")
