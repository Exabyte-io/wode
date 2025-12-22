import pytest
from mat3ra.wode.context.providers import PointsGridDataProvider
from mat3ra.esse.models.context_providers_directory.points_grid_data_provider import GridMetricType

# Test data constants
DIMENSIONS_DEFAULT = [1, 1, 1]
DIMENSIONS_CUSTOM = [1, 2, 3]
SHIFTS_DEFAULT = [0.0, 0.0, 0.0]
SHIFTS_CUSTOM = [0.5, 0.5, 0.5]
DIVISOR_DEFAULT = 1
DIVISOR_CUSTOM = 2
GRID_METRIC_TYPE_DEFAULT = GridMetricType.KPPRA

# Expected data structures
KGRID_DATA = {
    "kgrid": {
        "dimensions": DIMENSIONS_CUSTOM,
        "shifts": SHIFTS_DEFAULT,
        "divisor": DIVISOR_DEFAULT,
        "gridMetricType": GRID_METRIC_TYPE_DEFAULT,
    }
}

KGRID_MANAGER_DATA = {
    "KGridFormDataManager": KGRID_DATA,
    "isKGridFormDataManagerEdited": None,
}


@pytest.mark.parametrize(
    "init_params,expected_dimensions,expected_shifts,expected_divisor",
    [
        (
            {"dimensions": DIMENSIONS_CUSTOM},
            DIMENSIONS_CUSTOM,
            SHIFTS_DEFAULT,
            DIVISOR_DEFAULT,
        ),
    ],
)
def test_points_grid_data_provider_initialization(init_params, expected_dimensions, expected_shifts, expected_divisor):
    kgrid_context_provider_relax = PointsGridDataProvider(**init_params)

    assert kgrid_context_provider_relax.dimensions == expected_dimensions
    assert kgrid_context_provider_relax.shifts == expected_shifts
    assert kgrid_context_provider_relax.divisor == expected_divisor


@pytest.mark.parametrize(
    "init_params,expected_data",
    [
        (
                {"dimensions": DIMENSIONS_CUSTOM},
                KGRID_DATA,
        ),
    ],
)
def test_points_grid_data_provider_get_data(init_params, expected_data):
    kgrid_context_provider = PointsGridDataProvider(**init_params)
    actual_data = kgrid_context_provider.get_data()
    assert actual_data == expected_data


@pytest.mark.parametrize(
    "init_params,expected_data",
    [
        (
                {"dimensions": DIMENSIONS_CUSTOM},
                KGRID_MANAGER_DATA,
        ),
    ],
)
def test_points_grid_data_provider_yield_data(init_params, expected_data):
    kgrid_context_provider = PointsGridDataProvider(**init_params)
    actual_data = kgrid_context_provider.yield_data()
    assert actual_data == expected_data
