# MVP Implementation Checklist - Minimal for Notebook

## `src/py/mat3ra/wode/workflows/workflow.py`

### Class: `Workflow`

- `add_subworkflow(subworkflow, head=False, index=-1)`
- `add_relaxation()`
- `subworkflows` [property]
- `create(config)` [classmethod] - Create workflow from standata config
- `get_unit_by_name(name=None, name_regex=None)` - Search units across all subworkflows
- `set_unit(unit=None, unit_flowchart_id=None, new_unit=None)` - Replace unit in workflow

## `src/py/mat3ra/wode/subworkflows/subworkflow.py`

### Class: `Subworkflow`

- `units` [property]
- `get_as_unit()`
- `get_unit_by_name(name=None, name_regex=None)` - Search units within subworkflow
- `model` [property with setter] - Ensure model can be set directly

## `src/py/mat3ra/wode/units/unit.py`

### Class: `Unit` (Base)

- `flowchartId` [field]
- `name` [field] - inherited
- `context` [field: Dict] - Context data dict
- `add_context(new_context)` - Update context data

## `src/py/mat3ra/wode/units/factory.py`

### Class: `UnitFactory`

- `create(config)` [staticmethod] - Factory to instantiate correct unit type based on config["type"]

