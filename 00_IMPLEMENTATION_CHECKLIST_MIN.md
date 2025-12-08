# Implementation Checklist - Python Methods Required

## `src/py/mat3ra/wode/workflows/`

### Class: `Workflow`

Methods Python-Relevant:
- `generate_workflow_id(name, properties, subworkflows, application_name)` [static]
- `from_subworkflow(subworkflow)` [classmethod]
- `from_subworkflows(name, *subworkflows)` [classmethod]
- `add_subworkflow(subworkflow, head=False, index=-1)`
- `remove_subworkflow_by_id(id)`
- `replace_subworkflow_at_index(index, new_subworkflow)`
- `set_units(arr)`
- `add_unit(unit, head=False, index=-1)`
- `remove_unit(flowchart_id)`
- `add_unit_type(type, head=False, index=-1)`
- `find_subworkflow_by_id(id)`
- `calculate_hash()`
- `relaxation_subworkflow` [property]
- `is_relaxation_subworkflow(subworkflow)`
- `has_relaxation` [property]
- `toggle_relaxation()`
- `add_relaxation()`

Methods Missing for Notebook:
- ❌ `create(config)` [classmethod] - CRITICAL
- ❌ `get_unit_by_name(name=None, name_regex=None)` - CRITICAL
- ❌ `set_unit(unit=None, unit_flowchart_id=None, new_unit=None)` - CRITICAL

---

## `src/py/mat3ra/wode/subworkflows/`

### Class: `Subworkflow`

Methods Python-Relevant:
- `generate_subworkflow_id(name, application, model, method)` [static]
- `from_arguments(application, model, method, name, units, config)` [classmethod]
- `get_as_unit()`
- `set_units(units)`
- `add_unit(unit, index=-1)`
- `remove_unit(flowchart_id)`
- `get_unit(flowchart_id)`
- `replace_unit(index, unit)`
- `find_unit_by_id(id)`
- `find_unit_with_tag(tag)`
- `calculate_hash()`
- `model` [property with setter]

Methods Missing for Notebook:
- ❌ `get_unit_by_name(name=None, name_regex=None)` - CRITICAL

---

## `src/py/mat3ra/wode/units/`

### Class: `Unit` (Base)

Methods Python-Relevant:
- `generate_flowchart_id(*args)` [static]
- `get_hash_object()`
- `calculate_hash()`
- `is_in_status(status)`
- `clone(extra_context)`

Methods Missing for Notebook:
- ❌ `context` [property] - CRITICAL - needs Context class
- ❌ `context.add_context(new_context)` - CRITICAL

### Class: `ExecutionUnit`

Methods Python-Relevant:
- `get_hash_object()`

### Class: `AssignmentUnit`

Methods Python-Relevant:
- `get_assignment_config()` [static]
- `get_hash_object()`

### Class: `AssertionUnit`

Methods Python-Relevant:
- `get_assertion_config()` [static]
- `get_hash_object()`

### Class: `IOUnit`

Methods Python-Relevant:
- `get_io_config()` [static]
- `set_materials(materials)`
- `add_feature(feature)`
- `remove_feature(feature)`
- `add_target(target)`
- `remove_target(target)`
- `has_feature(feature)`
- `has_target(target)`

### Class: `MapUnit`

Methods Python-Relevant:
- `set_workflow_id(id)`

### Class: `ConditionUnit`

Methods Python-Relevant:
- `get_condition_config()` [static]
- `get_hash_object()`

### Class: `ProcessingUnit`

Methods Python-Relevant:
- `get_processing_config()` [static]
- `set_operation(op)`
- `set_operation_type(type)`
- `set_input(input)`

### Class: `ReduceUnit`

Methods Python-Relevant:
- `get_reduce_config(unit_name, map_unit, input)` [static]

### Class: `SubworkflowUnit`

Methods Python-Relevant:
- `get_subworkflow_config()` [static]

### Class: `UnitFactory`

Methods Python-Relevant:
- `create(config)` [static]

---

## `src/py/mat3ra/wode/` (new file needed)

### Class: `Context` ❌ NEW

Methods Missing for Notebook:
- ❌ `add_context(new_context)` - CRITICAL
- ❌ `get(key, default=None)`
- ❌ `remove(key)`
- ❌ `clear()`

---

## `src/py/mat3ra/wode/utils.py`

Functions Python-Relevant:
- `set_units_head(units)`
- `set_next_links(units)`
- `generate_uuid()`

---

## Critical Path for Notebook (Priority Order)

1. Create `Context` class → `src/py/mat3ra/wode/context.py`
2. Update `Unit` → Add `context: Context` field
3. Implement `Workflow.create()` → classmethod
4. Implement `workflow.get_unit_by_name()` → method
5. Implement `subworkflow.get_unit_by_name()` → method
6. Implement `workflow.set_unit()` → method
7. Verify `subworkflow.model` setter → property

---

## Summary

Total Methods Needed from 02: ~60 methods across all classes
Critical Methods from 03: 7 methods/features

Status:
- ✅ Existing: ~40 methods already implemented
- ⚠️ Partial: ~10 methods need enhancement
- ❌ Missing: ~17 methods need implementation

For Notebook to Work:
- Must implement: 6 critical items
- Should verify: 1 item (model setter)

