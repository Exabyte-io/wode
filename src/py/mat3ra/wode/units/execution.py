from typing import Dict, List, Optional

from pydantic import Field

from .unit import Unit


class ExecutionUnit(Unit):
    """
    Execution unit for running computational applications.

    Attributes:
        type: Unit type (execution)
        application: Application configuration
        executable: Executable configuration
        flavor: Flavor configuration
        input: Input files/templates
    """

    type: str = Field(default="execution")
    application: Optional[Dict] = Field(default=None)
    executable: Optional[Dict] = Field(default=None)
    flavor: Optional[Dict] = Field(default=None)
    input: List[Dict] = Field(default_factory=list)

