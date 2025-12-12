import re
from typing import Any, List, Optional

from mat3ra.utils.uuid import get_uuid


def generate_uuid() -> str:
    return get_uuid()


def find_by_name_or_regex(items: List[Any], name: Optional[str] = None, name_regex: Optional[str] = None) -> Optional[
    Any]:
    """
    Find an item in a list by exact name match or regex pattern.

    Args:
        items: List of objects to search through
        name: Exact name to match
        name_regex: Regex pattern to match against names

    Returns:
        First matching item or None
    """
    if name:
        for item in items:
            if item.name == name:
                return item
    elif name_regex:
        pattern = re.compile(name_regex)
        for item in items:
            if pattern.search(item.name):
                return item
    return None
