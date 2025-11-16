"""Base unit class for workflow units."""

from typing import Any, Dict, List, Optional
from uuid import uuid4

from pydantic import BaseModel, ConfigDict, Field

from ..enums import UnitStatus


class BaseUnit(BaseModel):
    """
    Base class for workflow units.

    A unit is the fundamental building block of a workflow, representing
    a single step or operation in a computational workflow.
    """

    model_config = ConfigDict(use_enum_values=True, extra="allow")

    name: str = Field(..., description="Human-readable name of the unit")
    type: str = Field(..., description="Type of the unit")
    flowchartId: str = Field(default_factory=lambda: str(uuid4()), description="Unique ID for flowchart visualization")
    head: bool = Field(default=False, description="Whether this is the head unit")
    next: Optional[str] = Field(default=None, description="ID of the next unit in the workflow")
    status: UnitStatus = Field(default=UnitStatus.IDLE, description="Current status of the unit")
    statusTrack: List[Dict[str, Any]] = Field(default_factory=list, description="History of status changes")
    tags: List[str] = Field(default_factory=list, description="Tags associated with the unit")
    isDraft: bool = Field(default=False, description="Whether this is a draft unit")
    repetition: int = Field(default=0, description="Repetition number for the unit")

    def is_in_status(self, status: UnitStatus) -> bool:
        """
        Check whether a unit is currently in a given status.

        Args:
            status: Status to check

        Returns:
            True if unit is in the given status
        """
        return self.status == status

    def model_dump(self, **kwargs) -> Dict[str, Any]:
        """Export unit to dictionary format."""
        return super().model_dump(**kwargs)

    def model_dump_json(self, **kwargs) -> str:
        """Export unit to JSON format."""
        return super().model_dump_json(**kwargs)
