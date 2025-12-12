from mat3ra.ade.context.context_provider import ContextProvider


class ExecutableContextProvider(ContextProvider):
    """
    Context provider for executable settings.
    """
    domain: str = "executable"
