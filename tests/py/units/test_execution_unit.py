from mat3ra.wode import ExecutionUnit


def test_default_values():
    unit = ExecutionUnit(type="execution", name="test")
    assert unit.type == "execution"
