import pytest
from mat3ra.standata.applications import ApplicationStandata
from mat3ra.standata.workflows import WorkflowStandata

from mat3ra.wode import Unit

WORKFLOW_STANDATA = WorkflowStandata()
APPLICATION_STANDATA = ApplicationStandata()

DEFAULT_WF_NAME = WORKFLOW_STANDATA.get_default()["name"]
APPLICATION_ESPRESSO = APPLICATION_STANDATA.get_by_name_first_match("espresso")["name"]

UNIT_FLOWCHART_ID = "abc-123-def"
UNIT_NEXT_ID = "next-456"

NEW_CONTEXT_RELAX = {
    "kgrid": {"density": 0.5},
    "convergence": {"threshold": 1e-6}
}

UNIT_CONFIG_EXECUTION = {
    "type": "execution",
    "name": "pw_scf",
    "flowchartId": UNIT_FLOWCHART_ID,
    "head": True,
}

UNIT_CONFIG_ASSIGNMENT = {
    "type": "assignment",
    "name": "kgrid",
    "flowchartId": "kgrid-flowchart-id",
    "head": False,
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


def test_add_context():
    unit = Unit(**{**UNIT_CONFIG_EXECUTION, "name": "relaxation step"})

    assert unit is not None
    assert "relax" in unit.name.lower()

    unit.add_context(NEW_CONTEXT_RELAX)

    assert "kgrid" in unit.context
    assert "convergence" in unit.context
    assert unit.context["kgrid"] == NEW_CONTEXT_RELAX["kgrid"]
    assert unit.context["convergence"] == NEW_CONTEXT_RELAX["convergence"]
