"""I/O unit class."""

from typing import Any, Dict, Literal, Optional

from pydantic import Field

from ..enums import UnitType
from .base import BaseUnit


class IOUnit(BaseUnit):
    """
    I/O unit for reading and writing data.

    This unit type handles input/output operations.
    """

    type: Literal[UnitType.IO] = Field(default=UnitType.IO)
    operation: Optional[str] = Field(default=None, description="I/O operation (read/write)")
    source: Optional[Dict[str, Any]] = Field(default=None, description="Data source")
    destination: Optional[Dict[str, Any]] = Field(default=None, description="Data destination")
