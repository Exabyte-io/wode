from typing import TYPE_CHECKING, List, Optional
from ..utils import add_to_list, find_by_name_or_regex

if TYPE_CHECKING:
    from ..units import Unit


class FlowchartUnitsManager:
    """
    Mixin class providing common unit operations for flowchart units.
    
    This mixin expects the class to have a `units: List[Unit]` attribute.
    It provides common methods for managing units in both Workflow and Subworkflow classes.
    """

    units: List["Unit"]

    def set_units(self, units: List["Unit"]) -> None:
        self.units = units

    def get_unit(self, flowchart_id: str) -> Optional["Unit"]:
        for unit in self.units:
            if unit.flowchartId == flowchart_id:
                return unit
        return None

    def find_unit_by_id(self, id: str) -> Optional["Unit"]:
        for unit in self.units:
            if getattr(unit, 'id', None) == id:
                return unit
        return None

    def find_unit_with_tag(self, tag: str) -> Optional["Unit"]:
        for unit in self.units:
            if hasattr(unit, 'tags') and tag in unit.tags:
                return unit
        return None

    def get_unit_by_name(self, name: Optional[str] = None, name_regex: Optional[str] = None) -> Optional["Unit"]:
        return find_by_name_or_regex(self.units, name=name, name_regex=name_regex)

    def set_units_head(self, units: List["Unit"]) -> List["Unit"]:
        """
        Set the head flag on the first unit and unset it on all others.
        
        Args:
            units: List of units to process
            
        Returns:
            The modified units list
        """
        if len(units) > 0:
            units[0].head = True
            for unit in units[1:]:
                unit.head = False
        return units

    def set_next_links(self, units: List["Unit"]) -> List["Unit"]:
        """
        Re-establishes the linked next => flowchartId logic in an array of units.
        
        Args:
            units: List of units to process
            
        Returns:
            The modified units list
        """
        flowchart_ids = [unit.flowchartId for unit in units]

        for i in range(len(units) - 1):
            unit_next = getattr(units[i], 'next', None)

            if unit_next is None:
                units[i].next = units[i + 1].flowchartId
                if i > 0:
                    units[i - 1].next = units[i].flowchartId
            elif unit_next not in flowchart_ids:
                units[i].next = units[i + 1].flowchartId

        return units

    def _clear_link_to_unit(self, flowchart_id: str) -> None:
        """
        Clear the 'next' link from any unit that points to the given flowchart_id.
        
        This is used to mend broken links when removing a unit.
        
        Args:
            flowchart_id: The flowchart_id to clear links to
        """
        for unit in self.units:
            if getattr(unit, 'next', None) == flowchart_id:
                unit.next = None
                break

    def add_unit(self, unit: "Unit", head: bool = False, index: int = -1) -> None:
        """
        Add a unit to the units list.
        
        Args:
            unit: Unit to add
            head: If True, add at the beginning
            index: If >= 0, insert at this index
        """
        if len(self.units) == 0:
            unit.head = True
            self.set_units([unit])
        else:
            add_to_list(self.units, unit, head, index)
            self.set_units(self.set_next_links(self.set_units_head(self.units)))

    # TODO: Consider removing setNextLinks and setUnitsHead calls when flowchart designer implemented.
    def remove_unit(self, flowchart_id: str) -> None:
        """
        Remove a unit by its flowchartId.
        
        Args:
            flowchart_id: The flowchartId of the unit to remove
        """

        if len(self.units) < 2:
            return

        unit_to_remove = None
        for unit in self.units:
            if unit.flowchartId == flowchart_id:
                unit_to_remove = unit
                break

        if not unit_to_remove:
            return

        self._clear_link_to_unit(unit_to_remove.flowchartId)

        remaining_units = [unit for unit in self.units if unit.flowchartId != flowchart_id]
        units_with_head = self.set_units_head(remaining_units)
        self.units = self.set_next_links(units_with_head)

    def replace_unit(self, index: int, unit: "Unit") -> None:
        """
        Replace a unit at a specific index.
        
        Args:
            index: Index of the unit to replace
            unit: New unit to place at that index
        """

        if 0 <= index < len(self.units):
            self.units[index] = unit
            self.set_units(self.set_next_links(self.set_units_head(self.units)))

    def set_unit(
            self,
            new_unit: "Unit",
            unit: Optional["Unit"] = None,
            unit_flowchart_id: Optional[str] = None,
    ) -> bool:
        """
        Replace a unit by finding it either by instance or flowchart_id.
        
        Args:
            new_unit: The new unit to set
            unit: The existing unit instance to replace
            unit_flowchart_id: The flowchart_id of the unit to replace
            
        Returns:
            True if successful, False otherwise
        """
        target_unit = unit if unit is not None else self.get_unit(unit_flowchart_id) if unit_flowchart_id else None

        if target_unit is None:
            return False

        try:
            unit_index = self.units.index(target_unit)
            self.replace_unit(unit_index, new_unit)
            return True
        except ValueError:
            return False
