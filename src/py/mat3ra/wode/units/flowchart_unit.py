from typing import Optional, Protocol


class FlowchartUnit(Protocol):
    """
    Protocol defining the interface for units that can participate in flowcharts.
    
    This protocol defines the common attributes that both Unit and Subworkflow
    must have to be managed by FlowchartUnitsManager.
    
    Attributes:
        flowchartId: Unique identifier for the unit in the flowchart
        head: Whether this unit is the head of the flowchart
        next: Flowchart ID of the next unit
        name: Name of the unit
    """

    flowchartId: str
    head: Optional[bool]
    next: Optional[str]
    name: str
