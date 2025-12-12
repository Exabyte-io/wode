from mat3ra.esse.models.workflow.unit.io import Subtype

from .. import IOUnit


class InputIOUnit(IOUnit):
    subtype: str = Subtype.input
