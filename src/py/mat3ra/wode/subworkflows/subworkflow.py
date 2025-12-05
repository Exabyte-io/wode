from typing import Any, Dict, List, Optional

from mat3ra.code.entity import InMemoryEntitySnakeCase
from pydantic import Field

from ..units import Unit


class Subworkflow(InMemoryEntitySnakeCase):
    """
    Subworkflow class representing a logical collection of workflow units.

    Attributes:
        name: Name of the subworkflow
        application: Application configuration
        model: Model configuration
        units: List of units in the subworkflow
        properties: List of properties extracted by the subworkflow
    """

    name: str = ""
    application: Dict[str, Any] = Field(default_factory=dict)
    model: Dict[str, Any] = Field(default_factory=dict)
    units: List[Unit] = Field(default_factory=list)
    properties: List[str] = Field(default_factory=list)
