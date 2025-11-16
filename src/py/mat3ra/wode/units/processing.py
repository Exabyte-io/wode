"""Processing unit class."""

from typing import Any, Dict, Literal, Optional

from pydantic import Field

from ..enums import UnitType
from .base import BaseUnit


class ProcessingUnit(BaseUnit):
    """
    Processing unit for data processing operations.

    This unit type performs processing operations on data.
    """

    type: Literal[UnitType.PROCESSING] = Field(default=UnitType.PROCESSING)
    operation: Optional[str] = Field(default=None, description="Processing operation")
    operationData: Optional[Dict[str, Any]] = Field(default=None, description="Data for the operation")
