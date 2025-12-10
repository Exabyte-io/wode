# TODO: We need materialContextMixin equivalent in Python

from typing import Any, Dict, List

from mat3ra.ade.context.context_provider import ContextProvider
from mat3ra.esse.models.context_providers_directory.non_collinear_magnetization_context_provider import (
    NonCollinearMagnetizationContextProviderSchema,
)


class NonCollinearMagnetizationContextProvider(
    NonCollinearMagnetizationContextProviderSchema, ContextProvider
):
    """
    Context provider for non-collinear magnetization settings.
    """

    # self.init_material_context_mixin()
    isStartingMagnetization: bool = True
    isConstrainedMagnetization: bool = False
    isExistingChargeDensity: bool = False
    # TODO: I don't see this field in the schema, `isArbitrarySpinAngle` exists though
    is_arbitrary_spin_direction: bool = False
    isFixedMagnetization: bool = False
    constrainedMagnetization: Dict[str, Any] = {}

    @property
    def unique_elements_with_labels(self) -> List[str]:
        raise NotImplementedError
