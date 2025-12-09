from mat3ra.wode import ProcessingUnit


def test_default_values():
    unit = ProcessingUnit(type="processing", name="test")
    assert unit.type == "processing"
