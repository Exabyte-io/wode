import pytest
from mat3ra.wode.units import Unit
from mat3ra.wode.workflows import Workflow

UNIT_1_NAME = "unit_1"
UNIT_2_NAME = "unit_2"
UNIT_3_NAME = "unit_3"
UNIT_TAG = "test_tag"
FLOWCHART_ID_1 = "flowchart-id-1"
FLOWCHART_ID_2 = "flowchart-id-2"
FLOWCHART_ID_3 = "flowchart-id-3"

UNIT_CONFIG_1 = {
    "type": "execution",
    "name": UNIT_1_NAME,
    "flowchartId": FLOWCHART_ID_1,
}

UNIT_CONFIG_2 = {
    "type": "execution",
    "name": UNIT_2_NAME,
    "flowchartId": FLOWCHART_ID_2,
}

UNIT_CONFIG_3 = {
    "type": "execution",
    "name": UNIT_3_NAME,
    "flowchartId": FLOWCHART_ID_3,
    "tags": [UNIT_TAG],
}


@pytest.fixture
def workflow():
    """Create a workflow instance for testing FlowchartUnitsManager methods."""
    return Workflow(name="Test Workflow")


@pytest.fixture
def unit_1():
    return Unit(**UNIT_CONFIG_1)


@pytest.fixture
def unit_2():
    return Unit(**UNIT_CONFIG_2)


@pytest.fixture
def unit_3():
    return Unit(**UNIT_CONFIG_3)


def test_set_units(workflow, unit_1, unit_2):
    units = [unit_1, unit_2]
    workflow.set_units(units)
    assert len(workflow.units) == 2
    assert workflow.units[0].flowchartId == FLOWCHART_ID_1
    assert workflow.units[1].flowchartId == FLOWCHART_ID_2


def test_get_unit(workflow, unit_1, unit_2):
    workflow.set_units([unit_1, unit_2])
    found_unit = workflow.get_unit(FLOWCHART_ID_1)
    assert found_unit is not None
    assert found_unit.flowchartId == FLOWCHART_ID_1
    assert found_unit.name == UNIT_1_NAME


def test_find_unit_by_id(workflow, unit_1, unit_2):
    workflow.set_units([unit_1, unit_2])
    found_unit = workflow.find_unit_by_id(unit_1.id)
    assert found_unit is not None
    assert found_unit.id == unit_1.id


def test_find_unit_with_tag(workflow, unit_3):
    workflow.set_units([unit_3])
    found_unit = workflow.find_unit_with_tag(UNIT_TAG)
    assert found_unit is not None
    assert UNIT_TAG in found_unit.tags


@pytest.mark.parametrize(
    "search_name,expected_name",
    [
        (UNIT_1_NAME, UNIT_1_NAME),
        (UNIT_1_NAME.upper(), UNIT_1_NAME),  # Case insensitive
        (UNIT_2_NAME, UNIT_2_NAME),
    ],
)
def test_get_unit_by_name(workflow, unit_1, unit_2, search_name, expected_name):
    workflow.set_units([unit_1, unit_2])
    found_unit = workflow.get_unit_by_name(name=search_name)
    assert found_unit is not None
    assert found_unit.name == expected_name


def test_get_unit_by_name_regex(workflow, unit_1, unit_2):
    workflow.set_units([unit_1, unit_2])
    found_unit = workflow.get_unit_by_name(name_regex=r"unit_\d")
    assert found_unit is not None
    assert found_unit.name in [UNIT_1_NAME, UNIT_2_NAME]


def test_set_units_head(workflow, unit_1, unit_2, unit_3):
    units = [unit_1, unit_2, unit_3]
    result = workflow.set_units_head(units)
    assert result[0].head is True
    assert result[1].head is False
    assert result[2].head is False


def test_set_next_links(workflow, unit_1, unit_2, unit_3):
    units = [unit_1, unit_2, unit_3]
    result = workflow.set_next_links(units)
    assert result[0].next == FLOWCHART_ID_2
    assert result[1].next == FLOWCHART_ID_3
    assert result[2].next is None or result[2].next == ""


def test_clear_link_to_unit(workflow, unit_1, unit_2):
    unit_1.next = FLOWCHART_ID_2
    workflow.set_units([unit_1, unit_2])
    workflow._clear_link_to_unit(FLOWCHART_ID_2)
    assert unit_1.next is None


def test_add_unit(workflow, unit_1, unit_2):
    workflow.add_unit(unit_1)
    assert len(workflow.units) == 1
    assert workflow.units[0].head is True
    assert workflow.units[0].flowchartId == FLOWCHART_ID_1

    workflow.add_unit(unit_2)
    assert len(workflow.units) == 2
    assert workflow.units[0].head is True
    assert workflow.units[1].head is False
    assert workflow.units[0].next == FLOWCHART_ID_2


@pytest.mark.parametrize(
    "head,expected_order",
    [
        (True, [FLOWCHART_ID_3, FLOWCHART_ID_1, FLOWCHART_ID_2]),
        (False, [FLOWCHART_ID_1, FLOWCHART_ID_2, FLOWCHART_ID_3]),
    ],
)
def test_add_unit_head_parameter(workflow, unit_1, unit_2, unit_3, head, expected_order):
    workflow.add_unit(unit_1)
    workflow.add_unit(unit_2)
    workflow.add_unit(unit_3, head=head)

    actual_order = [u.flowchartId for u in workflow.units]
    assert actual_order == expected_order


def test_remove_unit(workflow, unit_1, unit_2, unit_3):
    workflow.set_units([unit_1, unit_2, unit_3])
    workflow.remove_unit(FLOWCHART_ID_2)

    assert len(workflow.units) == 2
    assert workflow.units[0].flowchartId == FLOWCHART_ID_1
    assert workflow.units[1].flowchartId == FLOWCHART_ID_3
    assert workflow.units[0].next == FLOWCHART_ID_3


def test_replace_unit(workflow, unit_1, unit_2):
    workflow.set_units([unit_1])
    workflow.replace_unit(0, unit_2)

    assert len(workflow.units) == 1
    assert workflow.units[0].flowchartId == FLOWCHART_ID_2


@pytest.mark.parametrize(
    "provide_unit,provide_id,should_succeed",
    [
        (True, False, True),  # Provide unit instance
        (False, True, True),  # Provide flowchart_id
        (False, False, True),  # Provide neither (use new_unit.flowchartId)
    ],
)
def test_set_unit(workflow, unit_1, unit_2, provide_unit, provide_id, should_succeed):
    workflow.set_units([unit_1])

    # Create new unit with same flowchart_id
    new_unit = Unit(type="execution", name="Updated Unit", flowchartId=FLOWCHART_ID_1)

    if provide_unit:
        result = workflow.set_unit(new_unit, unit=unit_1)
    elif provide_id:
        result = workflow.set_unit(new_unit, unit_flowchart_id=FLOWCHART_ID_1)
    else:
        result = workflow.set_unit(new_unit)

    assert result is should_succeed
    if should_succeed:
        assert workflow.units[0].name == "Updated Unit"


def test_set_unit_replaces_itself(workflow):
    unit = Unit(type="execution", name="Original", flowchartId=FLOWCHART_ID_1)
    workflow.add_unit(unit)

    # Modify the unit outside
    unit.name = "Modified"

    # Replace it with itself using flowchartId
    result = workflow.set_unit(unit)

    assert result is True
    assert workflow.units[0].name == "Modified"
