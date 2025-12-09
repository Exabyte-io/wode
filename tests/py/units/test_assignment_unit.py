from mat3ra.wode import AssignmentUnit


def test_default_values():
    unit = AssignmentUnit(type="assignment", name="test", operand="x", value="1")
    assert unit.type == "assignment"
    assert unit.operand == "x"
