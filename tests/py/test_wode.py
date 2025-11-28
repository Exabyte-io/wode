"""Tests for workflow definitions."""


from mat3ra.wode import (
    AssertionUnit,
    AssignmentUnit,
    ConditionUnit,
    ExecutionUnit,
    IOUnit,
    MapUnit,
    ProcessingUnit,
    ReduceUnit,
    Subworkflow,
    SubworkflowUnit,
    UnitStatus,
    UnitType,
    Workflow,
)


def test_execution_unit_creation():
    """Test that ExecutionUnit can be created and has correct type."""
    unit = ExecutionUnit(name="test_execution", type=UnitType.EXECUTION)
    assert unit.name == "test_execution"
    assert unit.type == UnitType.EXECUTION
    assert unit.status == UnitStatus.IDLE
    assert isinstance(unit.flowchartId, str)


def test_assignment_unit_creation():
    """Test that AssignmentUnit can be created."""
    unit = AssignmentUnit(name="test_assignment", value=42)
    assert unit.name == "test_assignment"
    assert unit.type == UnitType.ASSIGNMENT
    assert unit.value == 42


def test_io_unit_creation():
    """Test that IOUnit can be created."""
    unit = IOUnit(name="test_io", operation="read")
    assert unit.name == "test_io"
    assert unit.type == UnitType.IO
    assert unit.operation == "read"


def test_map_unit_creation():
    """Test that MapUnit can be created."""
    unit = MapUnit(name="test_map", input=[1, 2, 3])
    assert unit.name == "test_map"
    assert unit.type == UnitType.MAP
    assert unit.input == [1, 2, 3]


def test_reduce_unit_creation():
    """Test that ReduceUnit can be created."""
    unit = ReduceUnit(name="test_reduce", operation="sum")
    assert unit.name == "test_reduce"
    assert unit.type == UnitType.REDUCE
    assert unit.operation == "sum"


def test_condition_unit_creation():
    """Test that ConditionUnit can be created."""
    unit = ConditionUnit(name="test_condition", condition="x > 0")
    assert unit.name == "test_condition"
    assert unit.type == UnitType.CONDITION
    assert unit.condition == "x > 0"


def test_assertion_unit_creation():
    """Test that AssertionUnit can be created."""
    unit = AssertionUnit(name="test_assertion", expression="result == expected")
    assert unit.name == "test_assertion"
    assert unit.type == UnitType.ASSERTION
    assert unit.expression == "result == expected"


def test_processing_unit_creation():
    """Test that ProcessingUnit can be created."""
    unit = ProcessingUnit(name="test_processing", operation="transform")
    assert unit.name == "test_processing"
    assert unit.type == UnitType.PROCESSING
    assert unit.operation == "transform"


def test_subworkflow_unit_creation():
    """Test that SubworkflowUnit can be created."""
    unit = SubworkflowUnit(name="test_subworkflow", _id="sw-123")
    assert unit.name == "test_subworkflow"
    assert unit.type == UnitType.SUBWORKFLOW
    assert unit.id == "sw-123"


def test_unit_status_check():
    """Test unit status checking."""
    unit = ExecutionUnit(name="test", status=UnitStatus.ACTIVE)
    assert unit.is_in_status(UnitStatus.ACTIVE)
    assert not unit.is_in_status(UnitStatus.IDLE)


def test_unit_serialization():
    """Test unit serialization to dict."""
    unit = ExecutionUnit(name="test_unit", application={"name": "espresso"})
    data = unit.model_dump()
    assert data["name"] == "test_unit"
    assert data["type"] == "execution"
    assert data["application"]["name"] == "espresso"


def test_subworkflow_creation():
    """Test Subworkflow creation."""
    subworkflow = Subworkflow(
        name="Test Subworkflow",
        application={"name": "espresso", "version": "6.3"},
        model={"type": "dft", "subtype": "gga"},
    )
    assert subworkflow.name == "Test Subworkflow"
    assert subworkflow.application["name"] == "espresso"
    assert subworkflow.model["type"] == "dft"
    assert isinstance(subworkflow.id, str)


def test_subworkflow_with_units():
    """Test Subworkflow with units."""
    unit_data = {"name": "scf", "type": "execution"}
    subworkflow = Subworkflow(
        name="SCF Calculation",
        application={"name": "espresso"},
        model={"type": "dft"},
        units=[unit_data],
    )
    assert len(subworkflow.units) == 1
    assert subworkflow.units[0]["name"] == "scf"


def test_workflow_creation():
    """Test Workflow creation."""
    workflow = Workflow(name="Test Workflow")
    assert workflow.name == "Test Workflow"
    assert isinstance(workflow.id, str)
    assert workflow.schemaVersion == "2022.5.10"


def test_workflow_with_subworkflows():
    """Test Workflow with subworkflows."""
    subworkflow_data = {
        "name": "SCF",
        "application": {"name": "espresso"},
        "model": {"type": "dft"},
    }
    unit_data = {"name": "scf_unit", "type": "subworkflow"}
    workflow = Workflow(name="Complete Workflow", subworkflows=[subworkflow_data], units=[unit_data])
    assert workflow.name == "Complete Workflow"
    assert len(workflow.subworkflows) == 1
    assert len(workflow.units) == 1
    assert workflow.subworkflows[0]["name"] == "SCF"


def test_workflow_serialization():
    """Test Workflow serialization."""
    workflow = Workflow(
        name="Test Workflow",
        properties=["band_structure", "total_energy"],
        applicationName="espresso",
    )
    data = workflow.model_dump()
    assert data["name"] == "Test Workflow"
    assert "band_structure" in data["properties"]
    assert data["applicationName"] == "espresso"
