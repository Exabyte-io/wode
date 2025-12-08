from pydantic import Field

from .unit import Unit


class SubworkflowUnit(Unit):
    """
    Subworkflow unit for wrapping subworkflows in workflow unit chain.

    Attributes:
        type: Unit type (subworkflow)
    """

    type: str = Field(default="subworkflow")

