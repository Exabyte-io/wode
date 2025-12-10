# TODO: We need applicationContextMixin equivalent in Python
# TODO: we need default config

from mat3ra.ade.context.context_provider import ContextProvider
from mat3ra.esse.models.context_providers_directory.ml_settings_context_provider import (
    MLSettingsContextProviderSchema,
)


class MLSettingsContextProvider(MLSettingsContextProviderSchema, ContextProvider):
    """
    Context provider for ML settings.
    """

    # self.init_application_context_mixin()
