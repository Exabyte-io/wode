from mat3ra.wode import AssertionUnit


def test_default_values():
    unit = AssertionUnit(type="assertion", name="test", statement="x > 0")
    assert unit.type == "assertion"
    assert unit.statement == "x > 0"
