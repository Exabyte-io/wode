from typing import Any, Dict, List, Optional

from mat3ra.code.entity import InMemoryEntitySnakeCase
from pydantic import Field


class Unit(InMemoryEntitySnakeCase):
    """
    Unit class representing a unit of computational work in a workflow.

    Attributes:
        type: Type of the unit (e.g., execution, assignment, condition)
        name: Name of the unit
        flowchart_id: Unique identifier for the unit in the flowchart
        head: Whether this unit is the head of the workflow
        next: Flowchart ID of the next unit
        tags: List of tags for the unit
    """

    type: str = ""
    name: str = ""
    flowchart_id: Optional[str] = None
    head: bool = False
    next: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
