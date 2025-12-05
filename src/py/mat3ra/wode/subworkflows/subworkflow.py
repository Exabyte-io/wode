from typing import List

from mat3ra.ade.application import Application
from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.subworkflow import Subworkflow as SubworkflowSchema
from mat3ra.mode.model import BaseModel1
from pydantic import Field

from ..units import Unit


class Subworkflow(SubworkflowSchema, InMemoryEntitySnakeCase):
    """
    Subworkflow class representing a logical collection of workflow units.

    Attributes:
        name: Name of the subworkflow
        application: Application configuration
        model: Model configuration
        units: List of units in the subworkflow
        properties: List of properties extracted by the subworkflow
    """
    
    application: Application
    model: BaseModel1 = Field(default_factory=BaseModel1)
    units: List[Unit] = Field(default_factory=list)
