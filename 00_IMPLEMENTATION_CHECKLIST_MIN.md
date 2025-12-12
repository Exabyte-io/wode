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
- `get_context(key, default)` - Get context value
- `remove_context(key)` - Remove context value
- `clear_context()` - Clear all context

## `src/py/mat3ra/wode/units/io.py`

### Class: `IOUnit`

- `set_materials(materials)` - Set materials
- `add_feature(feature)` - Add feature
- `remove_feature(feature)` - Remove feature
- `add_target(target)` - Add target
- `remove_target(target)` - Remove target
- `has_feature(feature)` - Check feature exists
- `has_target(target)` - Check target exists

## `src/py/mat3ra/wode/units/map.py`

### Class: `MapUnit`

- `set_workflow_id(id)` - Set workflow ID

## `src/py/mat3ra/wode/units/processing.py`

### Class: `ProcessingUnit`

- `set_operation(op)` - Set operation
- `set_operation_type(type)` - Set operation type
- `set_input(input)` - Set input

## `src/py/mat3ra/wode/units/factory.py`

### Class: `UnitFactory`

- `create(config)` [staticmethod] - Factory to instantiate correct unit type based on config["type"]
