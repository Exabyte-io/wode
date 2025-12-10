from typing import Any, Dict

from mat3ra.ade.context.context_provider import ContextProvider


class ExecutableContextProvider(ContextProvider):
    """
    Context provider for executable settings.
    """

    def __init__(self, config: Dict[str, Any]):
        super().__init__(**config, domain="executable")
