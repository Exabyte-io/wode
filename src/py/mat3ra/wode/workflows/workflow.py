from typing import List

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow import WorkflowSchema
from pydantic import Field

from ..subworkflows import Subworkflow
from ..units import Unit


class Workflow(WorkflowSchema, InMemoryEntitySnakeCase):
    """
    Workflow class representing a complete workflow configuration.

    Attributes:
        name: Name of the workflow
        subworkflows: List of subworkflows in the workflow
        units: List of units linking the subworkflows
        properties: List of properties extracted by the workflow
    """

    subworkflows: List[Subworkflow] = Field(default_factory=list) # still need to override with a class
    units: List[Unit] = Field(default_factory=list)
