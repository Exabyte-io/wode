from mat3ra.esse.models.workflow.unit.map import MapUnitSchema

from .unit import Unit


class MapUnit(MapUnitSchema, Unit):
    def set_workflow_id(self, id: str):
        raise NotImplementedError
