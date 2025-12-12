from .hubbard_u_context_provider import HubbardUContextProvider


class HubbardVContextProvider(HubbardUContextProvider):
    """
    Context provider for Hubbard V settings.
    """

    @property
    def first_species(self) -> str:
        raise NotImplementedError

    @property
    def second_species(self) -> str:
        raise NotImplementedError
