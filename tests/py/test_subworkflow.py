import pytest
from mat3ra.ade.application import Application
from mat3ra.mode.method import Method
from mat3ra.mode.model import Model
from mat3ra.standata.applications import ApplicationStandata
from mat3ra.wode import Subworkflow, Unit

SUBWORKFLOW_NAME = "Total Energy"
SUBWORKFLOW_APPLICATION = Application(**ApplicationStandata.get_by_name_first_match("espresso"))
SUBWORKFLOW_METHOD = Method(type="pseudopotential", subtype="us")
SUBWORKFLOW_MODEL = Model(type="dft", subtype="gga", method=SUBWORKFLOW_METHOD)
SUBWORKFLOW_PROPERTIES = ["total_energy", "pressure"]

UNIT_CONFIG = {
    "type": "execution",
    "name": "pw_scf",
    "flowchartId": "unit-flowchart-id",
    "head": True,
}


def test_creation():
    sw = Subworkflow(name=SUBWORKFLOW_NAME)
    assert sw.name == SUBWORKFLOW_NAME


@pytest.mark.parametrize("app_name", ["espresso", "vasp"])
def test_application(app_name):
    app_data = ApplicationStandata.get_by_name_first_match(app_name)
    application = Application(**app_data)
    sw = Subworkflow(name=SUBWORKFLOW_NAME, application=application)
    assert sw.application.name == app_name
    assert sw.application.version == app_data["version"]


@pytest.mark.parametrize(
    "model_type,model_subtype",
    [
        ("dft", "gga"),
        ("dft", "lda"),
    ],
)
def test_model(model_type, model_subtype):
    method = Method(type="pseudopotential", subtype="us")
    model = Model(type=model_type, subtype=model_subtype, method=method)
    sw = Subworkflow(name=SUBWORKFLOW_NAME, model=model)
    assert sw.model.type == model_type
    assert sw.model.subtype == model_subtype


def test_properties():
    sw = Subworkflow(name=SUBWORKFLOW_NAME, properties=SUBWORKFLOW_PROPERTIES)
    assert sw.properties == SUBWORKFLOW_PROPERTIES


def test_with_units():
    unit = Unit(**UNIT_CONFIG)
    sw = Subworkflow(name=SUBWORKFLOW_NAME, units=[unit])
    assert len(sw.units) == 1
    assert sw.units[0].name == UNIT_CONFIG["name"]


def test_field_id_generation():
    sw1 = Subworkflow(name=SUBWORKFLOW_NAME)
    sw2 = Subworkflow(name=SUBWORKFLOW_NAME)
    assert sw1.field_id != sw2.field_id


@pytest.mark.skip(reason="Implementation not complete")
def test_to_dict():
    sw = Subworkflow(name=SUBWORKFLOW_NAME, application=SUBWORKFLOW_APPLICATION)
    data = sw.to_dict()
    assert data["name"] == SUBWORKFLOW_NAME
    assert data["application"]["name"] == SUBWORKFLOW_APPLICATION.name
