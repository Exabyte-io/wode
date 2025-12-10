# TODO: we need default config
from mat3ra.ade.context.context_provider import ContextProvider
from mat3ra.esse.models.context_providers_directory.ion_dynamics_context_provider import (
    IonDynamicsContextProviderSchema,
)


class IonDynamicsContextProvider(IonDynamicsContextProviderSchema, ContextProvider):
    """
    Context provider for ion dynamics settings.
    """
