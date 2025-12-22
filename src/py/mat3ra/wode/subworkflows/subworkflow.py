from typing import List, Optional

from mat3ra.ade.application import Application
from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.subworkflow import Subworkflow as SubworkflowSchema
from mat3ra.mode.method import Method
from mat3ra.mode.model import Model
from mat3ra.utils.uuid import get_uuid
from pydantic import Field

from ..mixins import FlowchartUnitsManager
from ..units import Unit


class Subworkflow(SubworkflowSchema, InMemoryEntitySnakeCase, FlowchartUnitsManager):
    """
    Subworkflow class representing a logical collection of workflow units.

    Attributes:
        name: Name of the subworkflow
        application: Application configuration
        model: Model configuration
        units: List of units in the subworkflow
        properties: List of properties extracted by the subworkflow
    """

    id: str = Field(default_factory=get_uuid, alias="_id")
    application: Application = Field(
        default_factory=lambda: Application(name="", version="", build="", shortName="", summary="")
    )
    model: Model = Field(default_factory=lambda: Model(type="", subtype="", method=Method(type="", subtype="")))
    units: List[Unit] = Field(default_factory=list)

    @classmethod
    def from_arguments(
        cls,
        application: Application,
        model: Model,
        method: Method,
        name: str,
        units: Optional[List] = None,
        config: Optional[dict] = None,
    ) -> "Subworkflow":
        if units is None:
            units = []
        if config is None:
            config = {}

        model.method = method
        return cls(name=name, application=application, model=model, units=units, **config)

    @property
    def method_data(self):
        return self.model.method.data

    def get_as_unit(self) -> Unit:
        return Unit(type="subworkflow", id=self.id, name=self.name)
