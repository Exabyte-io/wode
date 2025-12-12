# TODO: We need applicationContextMixin equivalent in Python

from typing import Any, Dict, Optional

from mat3ra.ade.context.context_provider import ContextProvider
from mat3ra.esse.models.context_providers_directory.planewave_cutoffs_context_provider import (
    PlanewaveCutoffsContextProviderSchema,
)


class PlanewaveCutoffsContextProvider(PlanewaveCutoffsContextProviderSchema, ContextProvider):
    """
    Context provider for planewave cutoffs settings.
    """

    # self.init_application_context_mixin()

    @property
    def _cutoff_config_per_application(self) -> Dict[str, Any]:
        raise NotImplementedError

    @property
    def default_ecutwfc(self) -> Optional[float]:
        raise NotImplementedError

    @property
    def default_ecutrho(self) -> Optional[float]:
        raise NotImplementedError
