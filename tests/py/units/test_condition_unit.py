from mat3ra.wode import ConditionUnit


def test_default_values():
    unit = ConditionUnit(
        type="condition",
        name="test",
        statement="x > 0",
        then="a",
        else_="b",
    )
    assert unit.type == "condition"
    assert unit.statement == "x > 0"
