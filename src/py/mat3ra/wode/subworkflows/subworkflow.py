from typing import List, Optional

from mat3ra.ade.application import Application
from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.subworkflow import Subworkflow as SubworkflowSchema
from mat3ra.mode.method import Method
from mat3ra.mode.model import Model
from pydantic import Field

from ..units import Unit
from ..utils import generate_uuid


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

    field_id: str = Field(default_factory=generate_uuid, alias="_id")
    application: Application = Field(
        default_factory=lambda: Application(name="", version="", build="", shortName="", summary="")
    )
    model: Model = Field(
        default_factory=lambda: Model(type="", subtype="", method=Method(type="", subtype=""))
    )
    units: List[Unit] = Field(default_factory=list)

    @classmethod
    def from_arguments(cls, application, model, method, name: str, units: Optional[List] = None,
                       config: Optional[dict] = None) -> "Subworkflow":
        raise NotImplementedError

    # TODO: implement for MIN notebook
    def get_as_unit(self) -> Unit:
        raise NotImplementedError

    def set_units(self, units: List[Unit]):
        raise NotImplementedError

    def add_unit(self, unit: Unit, index: int = -1):
        raise NotImplementedError

    def remove_unit(self, flowchart_id: str):
        raise NotImplementedError

    def get_unit(self, flowchart_id: str) -> Optional[Unit]:
        raise NotImplementedError

    def replace_unit(self, index: int, unit: Unit):
        raise NotImplementedError

    def find_unit_by_id(self, id: str) -> Optional[Unit]:
        raise NotImplementedError

    def find_unit_with_tag(self, tag: str) -> Optional[Unit]:
        raise NotImplementedError

    # TODO: implement for MIN notebook
    def get_unit_by_name(self, name: Optional[str] = None, name_regex: Optional[str] = None) -> Optional[Unit]:
        raise NotImplementedError

    @property
    def properties(self) -> List[str]:
        raise NotImplementedError

    @property
    def is_multimaterial(self) -> bool:
        raise NotImplementedError

    @property
    def method_data(self):
        raise NotImplementedError

    @property
    def has_convergence(self) -> bool:
        raise NotImplementedError
