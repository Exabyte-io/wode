"""Map unit class."""

from typing import Any, Literal, Optional

from pydantic import Field

from ..enums import UnitType
from .base import BaseUnit


class MapUnit(BaseUnit):
    """
    Map unit for dynamic parallel operations.

    This unit type creates a dynamic number of units based on input data.
    """

    type: Literal[UnitType.MAP] = Field(default=UnitType.MAP)
    input: Optional[Any] = Field(default=None, description="Input data to map over")
