from typing import List

from mat3ra.code.entity import InMemoryEntitySnakeCase
from pydantic import Field

from ..subworkflows import Subworkflow
from ..units import Unit


class Workflow(InMemoryEntitySnakeCase):
    """
    Workflow class representing a complete workflow configuration.

    Attributes:
        name: Name of the workflow
        subworkflows: List of subworkflows in the workflow
        units: List of units linking the subworkflows
        properties: List of properties extracted by the workflow
    """

    name: str = ""
    subworkflows: List[Subworkflow] = Field(default_factory=list)
    units: List[Unit] = Field(default_factory=list)
    properties: List[str] = Field(default_factory=list)
