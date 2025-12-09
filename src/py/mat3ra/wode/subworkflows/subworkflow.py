from typing import List, Optional

from mat3ra.ade.application import Application
from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.subworkflow import Subworkflow as SubworkflowSchema
from mat3ra.mode.method import Method
from mat3ra.mode.model import Model
from pydantic import Field

from ..enums import UnitType
from ..mixins import UnitOperationsMixin
from ..units import Unit
from ..utils import generate_uuid


class Subworkflow(UnitOperationsMixin, SubworkflowSchema, InMemoryEntitySnakeCase):
    """
    Subworkflow class representing a logical collection of workflow units.

    Attributes:
        name: Name of the subworkflow
        application: Application configuration
        model: Model configuration
        units: List of units in the subworkflow
        properties: List of properties extracted by the subworkflow
    """

    field_id: str = Field(default_factory=generate_uuid, alias="_id")
    application: Application = Field(
        default_factory=lambda: Application(name="", version="", build="", shortName="", summary="")
    )
    model: Model = Field(default_factory=lambda: Model(type="", subtype="", method=Method(type="", subtype="")))
    units: List[Unit] = Field(default_factory=list)

    @property
    def id(self) -> str:
        return self.field_id

    # TODO: model, method, unit are classes or dicts?
    @classmethod
    def from_arguments(
            cls, application, model, method, name: str, units: Optional[List] = None, config: Optional[dict] = None
    ) -> "Subworkflow":
        if units is None:
            units = []
        if config is None:
            config = {}

        model_dict = model.model_dump() if hasattr(model, 'model_dump') else model
        method_dict = method.model_dump() if hasattr(method, 'model_dump') else method

        return cls(
            name=name,
            application=application,
            model={**model_dict, "method": method_dict},
            units=units,
            **config
        )

    @property
    def properties(self) -> List[str]:
        raise NotImplementedError

    @property
    def is_multimaterial(self) -> bool:
        raise NotImplementedError

    @property
    def method_data(self):
        raise NotImplementedError

    # TODO: implement for MIN notebook
    def get_as_unit(self) -> Unit:
        return Unit(
            type=UnitType.SUBWORKFLOW,
            _id=self.id,
            name=self.name
        )

    @property
    def method_data(self):
        if hasattr(self.model, 'method') and hasattr(self.model.method, 'data'):
            return self.model.method.data
        return None
