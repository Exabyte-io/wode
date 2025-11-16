"""Workflow class."""

from typing import Any, Dict, List, Optional
from uuid import uuid4

from pydantic import BaseModel, ConfigDict, Field


class Workflow(BaseModel):
    """
    Workflow class representing a complete computational workflow.

    A workflow consists of subworkflows and units that define a complete
    computational procedure.
    """

    model_config = ConfigDict(extra="allow", populate_by_name=True)

    id: str = Field(default_factory=lambda: str(uuid4()), alias="_id", description="Unique ID for the workflow")
    name: str = Field(..., description="Name of the workflow")
    subworkflows: List[Dict[str, Any]] = Field(default_factory=list, description="List of subworkflows")
    units: List[Dict[str, Any]] = Field(default_factory=list, description="List of units")
    workflows: List[Dict[str, Any]] = Field(default_factory=list, description="Nested workflows")
    properties: List[str] = Field(default_factory=list, description="Properties of the workflow")
    applicationName: Optional[str] = Field(default=None, description="Name of the application")
    compute: Optional[Dict[str, Any]] = Field(default=None, description="Compute configuration")
    schemaVersion: str = Field(default="2022.5.10", description="Schema version")

    def model_dump(self, **kwargs) -> Dict[str, Any]:
        """Export workflow to dictionary format."""
        # Use by_alias to maintain _id field name in output
        if "by_alias" not in kwargs:
            kwargs["by_alias"] = True
        return super().model_dump(**kwargs)

    def model_dump_json(self, **kwargs) -> str:
        """Export workflow to JSON format."""
        if "by_alias" not in kwargs:
            kwargs["by_alias"] = True
        return super().model_dump_json(**kwargs)
