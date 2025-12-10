# TODO: We need applicationContextMixin equivalent in Python

from typing import Any, Dict

from mat3ra.ade.context.context_provider import ContextProvider
from mat3ra.esse.models.context_providers_directory.ml_train_test_split_context_provider import (
    MLTrainTestSplitContextProviderSchema,
)


class MLTrainTestSplitContextProvider(MLTrainTestSplitContextProviderSchema, ContextProvider):
    """
    Context provider for ML train/test split settings.
    """
    # self.init_application_context_mixin()
