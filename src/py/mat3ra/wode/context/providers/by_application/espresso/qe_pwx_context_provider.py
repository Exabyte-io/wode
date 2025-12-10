# TODO: We need periodic_table.js equivalent in Python
# TODO: We need all mixins equivalent in Python

from typing import Any, Dict, List

from ..executable_context_provider import ExecutableContextProvider
from mat3ra.esse.models.context_providers_directory.by_application.qe_pwx_context_provider import (
    QEPwxContextProviderSchema,
)


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

    @staticmethod
    def atom_symbols(material: Any) -> List[str]:
        raise NotImplementedError

    @staticmethod
    def unique_elements_with_labels(material: Any) -> List[str]:
        raise NotImplementedError

    @staticmethod
    def atomic_positions_with_constraints(material: Any) -> str:
        raise NotImplementedError

    @staticmethod
    def atomic_positions(material: Any) -> str:
        raise NotImplementedError

    @staticmethod
    def nat(material: Any) -> int:
        raise NotImplementedError

    @staticmethod
    def ntyp(material: Any) -> int:
        raise NotImplementedError

    @staticmethod
    def ntyp_with_labels(material: Any) -> int:
        raise NotImplementedError

    def build_qe_pwx_context(self, material: Any) -> Dict[str, Any]:
        raise NotImplementedError

    def get_data_per_material(self) -> Dict[str, Any]:
        raise NotImplementedError

    def get_data(self) -> Dict[str, Any]:
        raise NotImplementedError

    @property
    def restart_mode(self) -> str:
        raise NotImplementedError

    def get_pseudo_by_symbol(self, symbol: str) -> Any:
        raise NotImplementedError

    def atomic_species(self, material: Any) -> str:
        raise NotImplementedError

    def atomic_species_with_labels(self, material: Any) -> str:
        raise NotImplementedError

    @staticmethod
    def cell_parameters(material: Any) -> str:
        raise NotImplementedError

    @staticmethod
    def symbol_to_atomic_specie(symbol: str, pseudo: Any) -> str:
        raise NotImplementedError

    @staticmethod
    def element_and_pseudo_to_atomic_specie_with_labels(
            symbol: str, pseudo: Any, label: str = ""
    ) -> str:
        raise NotImplementedError
