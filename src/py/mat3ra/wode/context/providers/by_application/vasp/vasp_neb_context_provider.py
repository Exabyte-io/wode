# TODO: We need all mixins equivalent in Python

from typing import Any, Dict, List

from ..executable_context_provider import ExecutableContextProvider
from mat3ra.esse.models.context_providers_directory.by_application.vasp_neb_context_provider import (
    VASPNEBContextProviderSchema,
)


class VASPNEBContextProvider(VASPNEBContextProviderSchema, ExecutableContextProvider):
    """
    Context provider for VASP NEB settings.
    """

    # self.init_material_context_mixin()
    # self.init_materials_context_mixin()
    # self.init_materials_set_context_mixin()
    # self.init_method_data_context_mixin()
    # self.init_workflow_context_mixin()
    # self.init_job_context_mixin()
    _materials: List[Any] = []

    def get_data(self) -> Dict[str, Any]:
        raise NotImplementedError
