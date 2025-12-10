# TODO: We need all mixins equivalent in Python

from typing import Any, Dict, List

from ..executable_context_provider import ExecutableContextProvider
from .qe_pwx_context_provider import QEPWXContextProvider
from mat3ra.esse.models.context_providers_directory.by_application.qe_neb_context_provider import (
    QENEBContextProviderSchema,
)


class QENEBContextProvider(QENEBContextProviderSchema, ExecutableContextProvider):
    """
    Context provider for Quantum ESPRESSO NEB settings.
    """

    # self.init_job_context_mixin()
    # self.init_materials_context_mixin()
    # self.init_method_data_context_mixin()
    # self.init_workflow_context_mixin()
    # self.init_material_context_mixin()
    # self.init_materials_set_context_mixin()
    _material: Any = None
    _materials: List[Any] = []
    _materials_set: Any = None

    def get_data(self) -> Dict[str, Any]:
        raise NotImplementedError
