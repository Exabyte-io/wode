import pytest
from mat3ra.ade.application import Application
from mat3ra.mode.method import Method
from mat3ra.mode.model import Model
from mat3ra.standata.applications import ApplicationStandata
from mat3ra.wode import Subworkflow, Unit, Workflow

WORKFLOW_NAME = "Band Structure"
SUBWORKFLOW_NAME = "Total Energy"
SUBWORKFLOW_APPLICATION = Application(**ApplicationStandata.get_by_name_first_match("espresso"))
SUBWORKFLOW_METHOD = Method(type="pseudopotential", subtype="us")
SUBWORKFLOW_MODEL = Model(type="dft", subtype="gga", method=SUBWORKFLOW_METHOD)

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
