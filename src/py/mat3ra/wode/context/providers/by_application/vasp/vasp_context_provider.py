# TODO: We need all mixins equivalent in Python

from typing import Any, Dict, List

from ..executable_context_provider import ExecutableContextProvider
from mat3ra.esse.models.context_providers_directory.by_application.vasp_context_provider import (
    VASPContextProviderSchema,
)


class VASPContextProvider(VASPContextProviderSchema, ExecutableContextProvider):
    """
    Context provider for VASP settings.
    """

    # self.init_job_context_mixin()
    # self.init_materials_context_mixin()
    # self.init_method_data_context_mixin()
    # self.init_workflow_context_mixin()
    # self.init_material_context_mixin()
    _material: Any = None
    _materials: List[Any] = []

    def build_vasp_context(self, material: Any) -> Dict[str, Any]:
        raise NotImplementedError

    def get_data_per_material(self) -> Dict[str, Any]:
        raise NotImplementedError

    def get_data(self) -> Dict[str, Any]:
        raise NotImplementedError
