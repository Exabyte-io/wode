from mat3ra.wode import SubworkflowUnit


def test_default_values():
    unit = SubworkflowUnit(name="test")
    assert unit.type == "subworkflow"
