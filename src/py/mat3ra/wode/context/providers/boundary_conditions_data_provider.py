# TODO: We need materialContextMixin equivalent in Python

from typing import Any, Dict

from mat3ra.ade.context.context_provider import ContextProvider
from mat3ra.esse.models.context_providers_directory.boundary_conditions_data_provider import (
    BoundaryConditionsDataProviderSchema,
)


class BoundaryConditionsDataProvider(BoundaryConditionsDataProviderSchema, ContextProvider):
    """
    Context provider for boundary conditions settings.
    """

    @property
    def boundary_conditions(self) -> Dict[str, Any]:
        raise NotImplementedError

    def yield_data_for_rendering(self) -> Dict[str, Any]:
        raise NotImplementedError
