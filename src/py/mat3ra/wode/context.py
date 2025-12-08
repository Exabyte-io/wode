from typing import Any, Dict

from pydantic import BaseModel, Field


class Context(BaseModel):
    """Context data container for units."""

    data: Dict[str, Any] = Field(default_factory=dict)

    def add_context(self, new_context: Dict[str, Any]):
        """Add or update context data."""
        raise NotImplementedError

    def get(self, key: str, default: Any = None) -> Any:
        """Get context value by key."""
        raise NotImplementedError

    def remove(self, key: str):
        """Remove context value by key."""
        raise NotImplementedError

    def clear(self):
        """Clear all context data."""
        raise NotImplementedError

