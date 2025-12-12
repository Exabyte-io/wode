from mat3ra.wode import MapUnit


def test_default_values():
    unit = MapUnit(type="map", name="test", workflowId="wf-123")
    assert unit.type == "map"
    assert unit.workflowId == "wf-123"
