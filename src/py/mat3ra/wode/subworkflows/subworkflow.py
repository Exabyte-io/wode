from typing import List, Optional

from mat3ra.ade.application import Application
from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.workflow.subworkflow import Subworkflow as SubworkflowSchema
from mat3ra.esse.models.workflow.unit.subworkflow import Type as UnitType
from mat3ra.mode.method import Method
from mat3ra.mode.model import Model
from pydantic import Field

from ..mixins import FlowchartUnitsManager
from ..units import Unit
from ..utils import generate_uuid


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

    field_id: str = Field(default_factory=generate_uuid, alias="_id")
    application: Application = Field(
        default_factory=lambda: Application(name="", version="", build="", shortName="", summary="")
    )
    model: Model = Field(default_factory=lambda: Model(type="", subtype="", method=Method(type="", subtype="")))
    units: List[Unit] = Field(default_factory=list)

    @classmethod
    def from_arguments(
            cls, application: Application, model: Model, method: Method, name: str, units: Optional[List] = None,
            config: Optional[dict] = None
    ) -> "Subworkflow":
        if units is None:
            units = []
        if config is None:
            config = {}

        model.method = method
        return cls(
            name=name,
            application=application,
            model=model,
            units=units,
            **config
        )

    @property
    def id(self) -> str:
        return self.field_id

    @property
    def properties(self) -> List[str]:
        raise NotImplementedError

    @property
    def is_multimaterial(self) -> bool:
        raise NotImplementedError

    @property
    def method_data(self):
        return self.model.method.data

    @property
    def context_providers(self) -> list:
        """
        Get unique subworkflow context providers from all units.
        
        Returns:
            List of unique context providers that are marked as subworkflow providers
        """
        raise NotImplementedError

    @property
    def context_from_assignment_units(self) -> dict:
        """
        Extract context from assignment units.
        
        Returns:
            Dictionary mapping operand names to their values from assignment units
        """
        raise NotImplementedError

    def get_as_unit(self) -> Unit:
        return Unit(
            type=UnitType.subworkflow.value,
            _id=self.id,
            name=self.name
        )

    def render(self, context: Optional[dict] = None) -> None:
        """
        Render the subworkflow and all its units with the given context.
        
        Args:
            context: Context dictionary to pass to units, combined with application,
                    model, methodData, and subworkflow context
        """
        raise NotImplementedError
