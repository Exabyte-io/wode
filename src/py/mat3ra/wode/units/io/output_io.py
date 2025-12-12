from mat3ra.esse.models.workflow.unit.io import Subtype

from .. import IOUnit


class OutputIOUnit(IOUnit):
    subtype: str = Subtype.output
