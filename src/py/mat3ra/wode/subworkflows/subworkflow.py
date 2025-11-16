"""Subworkflow class."""

from typing import Any, Dict, List, Optional
from uuid import uuid4

from pydantic import BaseModel, ConfigDict, Field


class Subworkflow(BaseModel):
    """
    Subworkflow class representing a logical collection of units.

    A subworkflow groups units together with a specific application and model.
    """

    model_config = ConfigDict(extra="allow", populate_by_name=True)

    id: str = Field(default_factory=lambda: str(uuid4()), alias="_id", description="Unique ID for the subworkflow")
    name: str = Field(..., description="Name of the subworkflow")
    application: Dict[str, Any] = Field(..., description="Application configuration")
    model: Dict[str, Any] = Field(..., description="Model configuration")
    method: Optional[Dict[str, Any]] = Field(default=None, description="Method configuration")
    units: List[Dict[str, Any]] = Field(default_factory=list, description="List of units in the subworkflow")
    properties: List[str] = Field(default_factory=list, description="Properties of the subworkflow")
    repetition: int = Field(default=0, description="Repetition number")

    def model_dump(self, **kwargs) -> Dict[str, Any]:
        """Export subworkflow to dictionary format."""
        # Use by_alias to maintain _id field name in output
        if "by_alias" not in kwargs:
            kwargs["by_alias"] = True
        return super().model_dump(**kwargs)

    def model_dump_json(self, **kwargs) -> str:
        """Export subworkflow to JSON format."""
        if "by_alias" not in kwargs:
            kwargs["by_alias"] = True
        return super().model_dump_json(**kwargs)
