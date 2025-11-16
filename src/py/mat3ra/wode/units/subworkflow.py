"""Subworkflow unit class."""

from typing import Literal, Optional

from pydantic import ConfigDict, Field

from ..enums import UnitType
from .base import BaseUnit


class SubworkflowUnit(BaseUnit):
    """
    Subworkflow unit for referencing subworkflows.

    This unit type references a subworkflow to be executed.
    """

    model_config = ConfigDict(populate_by_name=True)

    type: Literal[UnitType.SUBWORKFLOW] = Field(default=UnitType.SUBWORKFLOW)
    id: Optional[str] = Field(default=None, alias="_id", description="ID of the subworkflow to execute")
