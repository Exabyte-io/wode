from mat3ra.wode import SubworkflowUnit


def test_default_values():
    unit = SubworkflowUnit(type="subworkflow", name="test")
    assert unit.type == "subworkflow"
    assert unit.name == "test"
