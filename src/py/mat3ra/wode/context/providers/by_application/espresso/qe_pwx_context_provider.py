# TODO: We need periodic_table.js equivalent in Python
# TODO: We need all mixins equivalent in Python

from typing import Any, List

from mat3ra.esse.models.context_providers_directory.by_application.qe_pwx_context_provider import (
    QEPwxContextProviderSchema,
)

from ..executable_context_provider import ExecutableContextProvider


class QEPWXContextProvider(QEPwxContextProviderSchema, ExecutableContextProvider):
    """
    Context provider for Quantum ESPRESSO pw.x settings.
    """

    # self.init_materials_context_mixin()
    # self.init_method_data_context_mixin()
    # self.init_workflow_context_mixin()
    # self.init_job_context_mixin()
    # self.init_material_context_mixin()
    _material: Any = None
    _materials: List[Any] = []
