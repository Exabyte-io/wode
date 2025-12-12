from mat3ra.ade.context.context_provider import ContextProvider
from mat3ra.esse.models.context_providers_directory.neb_data_provider import NEBDataProviderSchema

# TODO: we need default config
class NEBDataProvider(NEBDataProviderSchema, ContextProvider):
    """
    Context provider for NEB settings.
    """
