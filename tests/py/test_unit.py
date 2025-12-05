import pytest

from mat3ra.wode import Unit

UNIT_FLOWCHART_ID = "abc-123-def"
UNIT_NEXT_ID = "next-456"

UNIT_CONFIG_EXECUTION = {
    "type": "execution",
    "name": "pw_scf",
    "flowchartId": UNIT_FLOWCHART_ID,
    "head": True,
    "preProcessors": [],
    "postProcessors": [],
    "monitors": [{"name": "standard_output"}],
    "results": [{"name": "total_energy"}],
}

UNIT_CONFIG_ASSIGNMENT = {
    "type": "assignment",
    "name": "kgrid",
    "flowchartId": "kgrid-flowchart-id",
    "head": False,
    "preProcessors": [],
    "postProcessors": [],
    "monitors": [],
    "results": [],
}


@pytest.mark.parametrize("config", [UNIT_CONFIG_EXECUTION, UNIT_CONFIG_ASSIGNMENT])
def test_creation(config):
    unit = Unit(**config)
    assert unit.type == config["type"]
    assert unit.name == config["name"]


def test_snake_case_properties():
    unit = Unit(**UNIT_CONFIG_EXECUTION)
    assert unit.flowchart_id == UNIT_FLOWCHART_ID


@pytest.mark.parametrize("head_value", [True, False])
def test_head_property(head_value):
    config = {**UNIT_CONFIG_EXECUTION, "head": head_value}
    unit = Unit(**config)
    assert unit.head == head_value


def test_next_property():
    config = {**UNIT_CONFIG_EXECUTION, "next": UNIT_NEXT_ID}
    unit = Unit(**config)
    assert unit.next == UNIT_NEXT_ID


def test_to_dict():
    unit = Unit(**UNIT_CONFIG_EXECUTION)
    data = unit.to_dict()
    assert data["type"] == UNIT_CONFIG_EXECUTION["type"]
    assert data["name"] == UNIT_CONFIG_EXECUTION["name"]
    assert data["head"] is True
