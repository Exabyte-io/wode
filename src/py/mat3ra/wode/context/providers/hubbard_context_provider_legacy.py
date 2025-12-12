from typing import Any, Dict, List, Optional

from .hubbard_u_context_provider import HubbardUContextProvider


class HubbardContextProviderLegacy(HubbardUContextProvider):
    """
    Legacy context provider for Hubbard settings.
    """

    def species_index_from_species(self, species: str) -> Optional[int]:
        raise NotImplementedError

    def transform_data(self, data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        raise NotImplementedError
