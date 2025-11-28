"""
Enums and constants for workflow definitions.
Shared across the codebase and tests.
"""

from enum import Enum


class UnitType(str, Enum):
    """Types of workflow units."""

    CONVERGENCE = "convergence"
    EXIT = "exit"
    EXECUTION = "execution"
    MAP = "map"
    REDUCE = "reduce"
    ASSIGNMENT = "assignment"
    CONDITION = "condition"
    SUBWORKFLOW = "subworkflow"
    PROCESSING = "processing"
    IO = "io"
    ASSERTION = "assertion"


class UnitStatus(str, Enum):
    """Status of workflow units."""

    IDLE = "idle"
    ACTIVE = "active"
    FINISHED = "finished"
    ERROR = "error"
    WARNING = "warning"


class UnitTag(str, Enum):
    """Tags for workflow units."""

    HAS_CONVERGENCE_PARAM = "hasConvergenceParam"
    HAS_CONVERGENCE_RESULT = "hasConvergenceResult"


class WorkflowStatus(str, Enum):
    """Status of workflows."""

    UP_TO_DATE = "up-to-date"
    OUTDATED = "outdated"


# Constants
IO_ID_COLUMN = "exabyteId"
UNIT_NAME_INVALID_CHARS = "/"
