from typing import List

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.unit.base import WorkflowBaseUnitSchema
from pydantic import Field


class Unit(WorkflowBaseUnitSchema, InMemoryEntitySnakeCase):
    """
    Unit class representing a unit of computational work in a workflow.

    Attributes:
        type: Type of the unit (e.g., execution, assignment, condition)
        name: Name of the unit
        flowchartId: Unique identifier for the unit in the flowchart
        head: Whether this unit is the head of the workflow
        next: Flowchart ID of the next unit
        tags: List of tags for the unit
    """
    
    preProcessors: List = Field(default_factory=list)
    postProcessors: List = Field(default_factory=list)
    monitors: List = Field(default_factory=list)
    results: List = Field(default_factory=list)
