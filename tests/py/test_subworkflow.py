import pytest

from mat3ra.wode import Subworkflow, Unit

SUBWORKFLOW_NAME = "Total Energy"
SUBWORKFLOW_APPLICATION = {"name": "espresso", "version": "6.3"}
SUBWORKFLOW_MODEL = {"type": "dft", "subtype": "gga"}
SUBWORKFLOW_PROPERTIES = ["total_energy", "pressure"]

UNIT_CONFIG = {
    "type": "execution",
    "name": "pw_scf",
    "flowchartId": "unit-flowchart-id",
    "head": True,
    "preProcessors": [],
    "postProcessors": [],
    "monitors": [],
    "results": [],
}


def test_creation():
    sw = Subworkflow(name=SUBWORKFLOW_NAME)
    assert sw.name == SUBWORKFLOW_NAME


@pytest.mark.parametrize("app_name,app_version", [
    ("espresso", "6.3"),
    ("vasp", "5.4.4"),
])
def test_application(app_name, app_version):
    application = {"name": app_name, "version": app_version}
    sw = Subworkflow(application=application)
    assert sw.application["name"] == app_name
    assert sw.application["version"] == app_version


@pytest.mark.parametrize("model_type,model_subtype", [
    ("dft", "gga"),
    ("dft", "lda"),
])
def test_model(model_type, model_subtype):
    model = {"type": model_type, "subtype": model_subtype}
    sw = Subworkflow(model=model)
    assert sw.model["type"] == model_type
    assert sw.model["subtype"] == model_subtype


def test_properties():
    sw = Subworkflow(properties=SUBWORKFLOW_PROPERTIES)
    assert sw.properties == SUBWORKFLOW_PROPERTIES


def test_with_units():
    unit = Unit(**UNIT_CONFIG)
    sw = Subworkflow(name=SUBWORKFLOW_NAME, units=[unit])
    assert len(sw.units) == 1
    assert sw.units[0].name == UNIT_CONFIG["name"]


def test_to_dict():
    sw = Subworkflow(name=SUBWORKFLOW_NAME, application=SUBWORKFLOW_APPLICATION)
    data = sw.to_dict()
    assert data["name"] == SUBWORKFLOW_NAME
    assert data["application"] == SUBWORKFLOW_APPLICATION
