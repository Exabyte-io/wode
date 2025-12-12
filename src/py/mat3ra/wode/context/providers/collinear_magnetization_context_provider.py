# TODO: We need materialContextMixin equivalent in Python

from typing import Any, Dict, List

from mat3ra.ade.context.context_provider import ContextProvider
from mat3ra.esse.models.context_providers_directory.collinear_magnetization_context_provider import (
    CollinearMagnetizationContextProviderSchema,
)


class CollinearMagnetizationContextProvider(
    CollinearMagnetizationContextProviderSchema, ContextProvider
):
    """
    Context provider for collinear magnetization settings.
    """

    # self.init_material_context_mixin()
    first_element: str = ""
    isTotalMagnetization: bool = False

    @property
    def unique_elements_with_labels(self) -> List[str]:
        raise NotImplementedError

    def index_of_element(self, element: str) -> int:
        raise NotImplementedError


    def transform_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        raise NotImplementedError
