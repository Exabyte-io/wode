# TODO: We need periodic_table.js equivalent in Python
# TODO: We need all mixins equivalent in Python

from typing import Any, Dict, List, Optional

from ..executable_context_provider import ExecutableContextProvider

from mat3ra.esse.models.context_providers_directory.by_application.nwchem_total_energy_context_provider import (
    NWChemTotalEnergyContextProviderSchema,
)

class NWChemTotalEnergyContextProvider(NWChemTotalEnergyContextProviderSchema,ExecutableContextProvider):
    """
    Context provider for NWChem total energy settings.
    """

    # self.init_method_data_context_mixin()
    # self.init_workflow_context_mixin()
    # self.init_job_context_mixin()
    # self.init_material_context_mixin()
    _material: Any = None

    @property
    def atomic_positions_without_constraints(self) -> List[str]:
        raise NotImplementedError

    @property
    def atomic_positions(self) -> List[str]:
        raise NotImplementedError

    @property
    def atom_symbols(self) -> List[str]:
        raise NotImplementedError

    @property
    def cartesian_atomic_positions(self) -> bool:
        raise NotImplementedError

    @property
    def atomic_species(self) -> str:
        raise NotImplementedError

    def get_data(self) -> Dict[str, Any]:
        raise NotImplementedError

    @staticmethod
    def symbol_to_atomic_species(symbol: str, pseudo: Any) -> Optional[str]:
        raise NotImplementedError
