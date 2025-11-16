"""
WOrkflow DEfinitions - Python implementation.

This package provides Python classes for workflow definitions, including:
- Workflow: A complete computational workflow
- Subworkflow: A logical collection of units
- Units: Individual workflow steps (Execution, Assignment, I/O, etc.)
"""

from .enums import (
    IO_ID_COLUMN,
    UNIT_NAME_INVALID_CHARS,
    UnitStatus,
    UnitTag,
    UnitType,
    WorkflowStatus,
)
from .subworkflows import Subworkflow
from .units import (
    AssertionUnit,
    AssignmentUnit,
    BaseUnit,
    ConditionUnit,
    ExecutionUnit,
    IOUnit,
    MapUnit,
    ProcessingUnit,
    ReduceUnit,
    SubworkflowUnit,
)
from .workflows import Workflow

__all__ = [
    # Enums and constants
    "UnitType",
    "UnitStatus",
    "UnitTag",
    "WorkflowStatus",
    "IO_ID_COLUMN",
    "UNIT_NAME_INVALID_CHARS",
    # Main classes
    "Workflow",
    "Subworkflow",
    # Unit classes
    "BaseUnit",
    "ExecutionUnit",
    "AssignmentUnit",
    "ConditionUnit",
    "IOUnit",
    "MapUnit",
    "ReduceUnit",
    "AssertionUnit",
    "ProcessingUnit",
    "SubworkflowUnit",
]
