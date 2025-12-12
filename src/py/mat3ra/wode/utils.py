import re
from typing import Any, List, Optional, TypeVar

from mat3ra.utils.uuid import get_uuid

T = TypeVar('T')


def generate_uuid() -> str:
    return get_uuid()


def add_to_list(items: List[T], item: T, head: bool = False, index: int = -1) -> None:
    """
    Add an item to a list at a specified position.

    Args:
        items: The list to add to
        item: The item to add
        head: If True, insert at the beginning (index 0)
        index: If >= 0, insert at this specific index
               If < 0, append to the end
    """
    if head:
        items.insert(0, item)
    elif index >= 0:
        items.insert(index, item)
    else:
        items.append(item)


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
