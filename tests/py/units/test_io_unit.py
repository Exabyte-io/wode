from mat3ra.wode import IOUnit


def test_default_values():
    unit = IOUnit(type="io", name="test", subtype="input", source="api")
    assert unit.type == "io"
    assert unit.subtype.value == "input"
