import pytest
from mat3ra.standata.workflows import WorkflowStandata
from mat3ra.standata.subworkflows import SubworkflowStandata
from mat3ra.standata.applications import ApplicationStandata
from mat3ra.wode import Subworkflow, Unit, Workflow

WORKFLOW_STANDATA = WorkflowStandata()
SUBWORKFLOW_STANDATA = SubworkflowStandata()
APPLICATION_STANDATA = ApplicationStandata()

WORKFLOW_NAME = WORKFLOW_STANDATA.get_by_name_first_match(
    "band_gap"
)["name"]
SUBWORKFLOW_NAME = SUBWORKFLOW_STANDATA.get_by_name_first_match(
    "pw_scf"
)["name"]
DEFAULT_WF_NAME = WORKFLOW_STANDATA.get_default()["name"]

APPLICATION_ESPRESSO = APPLICATION_STANDATA.get_by_name_first_match("espresso")["name"]
APPLICATION_VASP = APPLICATION_STANDATA.get_by_name_first_match("vasp")["name"]
APPLICATION_PYTHON = APPLICATION_STANDATA.get_by_name_first_match("python")["name"]
RELAXATION_NAME = SUBWORKFLOW_STANDATA.get_relaxation_by_application(APPLICATION_ESPRESSO)["name"]

UNIT_CONFIG = {
    "type": "execution",
    "name": "pw_scf",
    "flowchartId": "unit-flowchart-id",
    "head": True,
}


def test_creation():
    wf = Workflow(name=WORKFLOW_NAME)
    assert wf.name == WORKFLOW_NAME


def test_subworkflows():
    sw = Subworkflow(name=SUBWORKFLOW_NAME)
    wf = Workflow(name=WORKFLOW_NAME, subworkflows=[sw])
    assert len(wf.subworkflows) == 1
    assert wf.subworkflows[0].name == SUBWORKFLOW_NAME


def test_with_units():
    unit = Unit(**UNIT_CONFIG)
    wf = Workflow(name=WORKFLOW_NAME, units=[unit])
    assert len(wf.units) == 1
    assert wf.units[0].name == UNIT_CONFIG["name"]


def test_field_id_generation():
    wf1 = Workflow(name=WORKFLOW_NAME)
    wf2 = Workflow(name=WORKFLOW_NAME)
    assert wf1.field_id != wf2.field_id


def test_to_dict():
    wf = Workflow(name=WORKFLOW_NAME)
    data = wf.to_dict()
    assert data["name"] == WORKFLOW_NAME

def test_add_subworkflow():
    wf = Workflow(name=WORKFLOW_NAME)
    sw = Subworkflow(name=SUBWORKFLOW_NAME)
    wf.add_subworkflow(sw)
    assert len(wf.subworkflows) == 1
    assert wf.subworkflows[0].name == SUBWORKFLOW_NAME
    assert len(wf.units) == 1
    assert wf.units[0].name == SUBWORKFLOW_NAME
    assert wf.units[0].type == "subworkflow"

@pytest.mark.parametrize(
    "application,has_relaxation",
    [
        (APPLICATION_ESPRESSO, True),
        (APPLICATION_VASP, True),
        (APPLICATION_PYTHON, False),
    ],
)
def test_get_relaxation_subworkflow(application, has_relaxation):
    workflows = WORKFLOW_STANDATA.get_by_categories(application, DEFAULT_WF_NAME)
    if not workflows:
        pytest.skip(f"No {DEFAULT_WF_NAME} workflow found for {application}")

    workflow_config = workflows[0]
    wf = Workflow(**workflow_config)

    result = wf.relaxation_subworkflow
    if has_relaxation:
        assert result is not None
        assert result.name == RELAXATION_NAME
        assert hasattr(result, 'name')
    else:
        assert result is None


@pytest.mark.parametrize(
    "application",
    [APPLICATION_ESPRESSO, APPLICATION_VASP],
)
def test_add_relaxation(application):
    workflows = WORKFLOW_STANDATA.get_by_categories(application, DEFAULT_WF_NAME)
    if not workflows:
        pytest.skip(f"No {DEFAULT_WF_NAME} workflow found for {application}")

    workflow_config = workflows[0]
    wf = Workflow(**workflow_config)

    initial_subworkflow_count = len(wf.subworkflows)
    assert not wf.has_relaxation

    wf.add_relaxation()

    assert wf.has_relaxation
    assert len(wf.subworkflows) == initial_subworkflow_count + 1
    assert wf.subworkflows[0].name == wf.relaxation_subworkflow.name


@pytest.mark.parametrize(
    "application",
    [APPLICATION_ESPRESSO, APPLICATION_VASP],
)
def test_remove_relaxation(application):
    workflows = WORKFLOW_STANDATA.get_by_categories(application, DEFAULT_WF_NAME)
    if not workflows:
        pytest.skip(f"No {DEFAULT_WF_NAME} workflow found for {application}")

    workflow_config = workflows[0]
    wf = Workflow(**workflow_config)

    wf.add_relaxation()
    assert wf.has_relaxation
    initial_subworkflow_count = len(wf.subworkflows)

    wf.remove_relaxation()

    assert not wf.has_relaxation
    assert len(wf.subworkflows) == initial_subworkflow_count - 1
