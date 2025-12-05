import pytest

from mat3ra.wode import Workflow, Subworkflow, Unit

WORKFLOW_NAME = "Band Structure"
WORKFLOW_PROPERTIES = ["band_structure", "band_gap"]

SUBWORKFLOW_NAME = "Total Energy"
SUBWORKFLOW_APPLICATION = {"name": "espresso", "version": "6.3"}


def test_creation():
    wf = Workflow(name=WORKFLOW_NAME)
    assert wf.name == WORKFLOW_NAME


@pytest.mark.parametrize("properties", [
    ["band_structure"],
    ["band_structure", "band_gap"],
    ["total_energy", "pressure", "fermi_energy"],
])
def test_properties(properties):
    wf = Workflow(properties=properties)
    assert wf.properties == properties


def test_with_subworkflows():
    sw = Subworkflow(name=SUBWORKFLOW_NAME, application=SUBWORKFLOW_APPLICATION)
    wf = Workflow(name=WORKFLOW_NAME, subworkflows=[sw])
    assert len(wf.subworkflows) == 1
    assert wf.subworkflows[0].name == SUBWORKFLOW_NAME


def test_with_units():
    unit = Unit(type="subworkflow", name=SUBWORKFLOW_NAME, head=True)
    wf = Workflow(name=WORKFLOW_NAME, units=[unit])
    assert len(wf.units) == 1
    assert wf.units[0].head is True


def test_to_dict():
    sw = Subworkflow(name=SUBWORKFLOW_NAME)
    unit = Unit(type="subworkflow", name=SUBWORKFLOW_NAME, head=True)
    wf = Workflow(name=WORKFLOW_NAME, subworkflows=[sw], units=[unit])
    data = wf.to_dict()
    assert data["name"] == WORKFLOW_NAME
    assert len(data["subworkflows"]) == 1
    assert len(data["units"]) == 1


@pytest.mark.parametrize("num_subworkflows", [1, 2, 3])
def test_multiple_subworkflows(num_subworkflows):
    subworkflows = [Subworkflow(name=f"SW_{i}") for i in range(num_subworkflows)]
    wf = Workflow(name=WORKFLOW_NAME, subworkflows=subworkflows)
    assert len(wf.subworkflows) == num_subworkflows

