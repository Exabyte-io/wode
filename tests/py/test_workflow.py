import pytest
from mat3ra.standata.workflows import WorkflowStandata
from mat3ra.wode import Subworkflow, Unit, Workflow

WORKFLOW_NAME = "Band Structure"
SUBWORKFLOW_NAME = "Total Energy"
DEFAULT_WF_NAME = "total_energy"

WORKFLOW_STANDATA = WorkflowStandata()

APPLICATION_ESPRESSO = "espresso"
APPLICATION_VASP = "vasp"
APPLICATION_PYTHON = "python"
RELAXATION_NAME = "Variable-cell Relaxation"

UNIT_CONFIG = {
    "type": "execution",
    "name": "pw_scf",
    "flowchartId": "unit-flowchart-id",
    "head": True,
}


def test_creation():
    wf = Workflow(name=WORKFLOW_NAME)
    assert wf.name == WORKFLOW_NAME


def test_with_subworkflows():
    sw = Subworkflow(name=SUBWORKFLOW_NAME)
    wf = Workflow(name=WORKFLOW_NAME, subworkflows=[sw])
    assert len(wf.subworkflows) == 1
    assert wf.subworkflows[0].name == SUBWORKFLOW_NAME


@pytest.mark.parametrize("count", [1, 2, 3])
def test_multiple_subworkflows(count):
    subworkflows = [Subworkflow(name=f"{SUBWORKFLOW_NAME} {i}") for i in range(count)]
    wf = Workflow(name=WORKFLOW_NAME, subworkflows=subworkflows)
    assert len(wf.subworkflows) == count


def test_with_units():
    unit = Unit(**UNIT_CONFIG)
    wf = Workflow(name=WORKFLOW_NAME, units=[unit])
    assert len(wf.units) == 1
    assert wf.units[0].name == UNIT_CONFIG["name"]


def test_is_multi_material():
    wf = Workflow(name=WORKFLOW_NAME, isMultiMaterial=True)
    assert wf.isMultiMaterial is True


def test_field_id_generation():
    wf1 = Workflow(name=WORKFLOW_NAME)
    wf2 = Workflow(name=WORKFLOW_NAME)
    assert wf1.field_id != wf2.field_id


@pytest.mark.skip(reason="Implementation not complete")
def test_to_dict():
    wf = Workflow(name=WORKFLOW_NAME)
    data = wf.to_dict()
    assert data["name"] == WORKFLOW_NAME
    assert "_id" in data


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
