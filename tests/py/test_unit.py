import pytest

from mat3ra.wode import Unit

UNIT_EXECUTION_TYPE = "execution"
UNIT_ASSIGNMENT_TYPE = "assignment"
UNIT_NAME_PW_SCF = "pw_scf"
UNIT_FLOWCHART_ID = "abc-123-def"
UNIT_NEXT_ID = "next-456"
UNIT_TAGS = ["tag1", "tag2"]


@pytest.mark.parametrize("unit_type,unit_name", [
    (UNIT_EXECUTION_TYPE, UNIT_NAME_PW_SCF),
    (UNIT_ASSIGNMENT_TYPE, "kgrid"),
])
def test_creation(unit_type, unit_name):
    unit = Unit(type=unit_type, name=unit_name)
    assert unit.type == unit_type
    assert unit.name == unit_name


def test_snake_case_properties():
    unit = Unit(flowchart_id=UNIT_FLOWCHART_ID)
    assert unit.flowchart_id == UNIT_FLOWCHART_ID


@pytest.mark.parametrize("head_value", [True, False])
def test_head_property(head_value):
    unit = Unit(head=head_value)
    assert unit.head == head_value


def test_next_property():
    unit = Unit(next=UNIT_NEXT_ID)
    assert unit.next == UNIT_NEXT_ID


def test_tags():
    unit = Unit(tags=UNIT_TAGS)
    assert unit.tags == UNIT_TAGS


def test_to_dict():
    unit = Unit(type=UNIT_EXECUTION_TYPE, name=UNIT_NAME_PW_SCF, head=True)
    data = unit.to_dict()
    assert data["type"] == UNIT_EXECUTION_TYPE
    assert data["name"] == UNIT_NAME_PW_SCF
    assert data["head"] is True

