from typing import Dict

from .unit import Unit


class UnitFactory:
    """Factory for creating unit instances from configuration."""

    @staticmethod
    def create(config: Dict) -> Unit:
        """
        Create unit instance from config based on type.

        Args:
            config: Unit configuration dictionary

        Returns:
            Unit instance of appropriate type
        """
        raise NotImplementedError

