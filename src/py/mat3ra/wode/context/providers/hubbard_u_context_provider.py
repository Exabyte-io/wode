# TODO: We need materialContextMixin equivalent in Python

from typing import List

from mat3ra.ade.context.context_provider import ContextProvider
from mat3ra.esse.models.context_providers_directory.hubbard_u_context_provider import (
    HubbardUContextProviderSchema,
)


class HubbardUContextProvider(HubbardUContextProviderSchema, ContextProvider):
    """
    Context provider for Hubbard U settings.
    """
    # self.init_material_context_mixin()
    unique_elements: List[str] = []
    orbital_list: List[str] = []
    unique_elements_with_labels: List[str] = []
    first_element: str = ""
