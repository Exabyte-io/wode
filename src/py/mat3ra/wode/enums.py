from enum import Enum


# TODO: should come from ESSE
class UnitType(str, Enum):
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
