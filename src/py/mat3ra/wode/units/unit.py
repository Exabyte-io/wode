from typing import Any, Dict, List, Optional

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit import SubworkflowUnitSchema
from pydantic import Field


class Unit(InMemoryEntitySnakeCase, SubworkflowUnitSchema):
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
    pass
