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
- `context` [field: Context] - Add Context field with default factory

## `src/py/mat3ra/wode/units/execution.py`

### Class: `ExecutionUnit`

- `type` - default "execution"
- `application` - optional dict
- `executable` - optional dict
- `flavor` - optional dict
- `input` - list of dicts

## `src/py/mat3ra/wode/units/subworkflow_unit.py`

### Class: `SubworkflowUnit`

- `type` - default "subworkflow"

## `src/py/mat3ra/wode/units/factory.py` (if exists, or create new)

### Class: `UnitFactory`

- `create(config)` [staticmethod] - Factory to instantiate correct unit type based on config["type"]

## `src/py/mat3ra/wode/context.py`

### Class: `Context`

- `data` - dict for storing context data
- `add_context(new_context)` - Update context data

