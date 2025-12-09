from mat3ra.wode import ReduceUnit


def test_default_values():
    unit = ReduceUnit(type="reduce", name="test", mapFlowchartId="map-123")
    assert unit.type == "reduce"
    assert unit.mapFlowchartId == "map-123"
