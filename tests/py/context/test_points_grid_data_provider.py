import pytest
from mat3ra.wode.context.providers import PointsGridDataProvider

# Test data constants
DIMENSIONS_DEFAULT = [1, 1, 1]
DIMENSIONS_CUSTOM = [1, 2, 3]
SHIFTS_DEFAULT = [0.0, 0.0, 0.0]
SHIFTS_CUSTOM = [0.5, 0.5, 0.5]
DIVISOR_DEFAULT = 1
DIVISOR_CUSTOM = 2
DATA_CUSTOM = {
    "dimensions": DIMENSIONS_CUSTOM,
    "shifts": SHIFTS_CUSTOM,
    "divisor": DIVISOR_CUSTOM,
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
def test_points_grid_data_provider_initialization(
    init_params, expected_dimensions, expected_shifts, expected_divisor
):
    kgrid_context_provider_relax = PointsGridDataProvider(**init_params)
    
    assert kgrid_context_provider_relax.dimensions == expected_dimensions
    assert kgrid_context_provider_relax.shifts == expected_shifts
    assert kgrid_context_provider_relax.divisor == expected_divisor


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
def test_points_grid_data_provider_get_data(init_params, expected_dimensions, expected_shifts, expected_divisor):
    kgrid_context_provider_relax = PointsGridDataProvider(**init_params)

    new_context_relax = kgrid_context_provider_relax.get_data()

    assert isinstance(new_context_relax, dict)
    assert "dimensions" in new_context_relax
    assert "shifts" in new_context_relax
    assert "divisor" in new_context_relax
    assert "gridMetricType" in new_context_relax

    assert new_context_relax["dimensions"] == expected_dimensions
    assert new_context_relax["shifts"] == expected_shifts
    assert new_context_relax["divisor"] == expected_divisor


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
def test_points_grid_data_provider_yield_data(init_params, expected_dimensions, expected_shifts, expected_divisor):
    kgrid_context_provider_relax = PointsGridDataProvider(**init_params)

    yielded_context = kgrid_context_provider_relax.yield_data()

    print(yielded_context)
    assert isinstance(yielded_context, dict)
    assert "KGridFormDataManager" in yielded_context
    assert "isKGridFormDataManagerEdited" in yielded_context

    data = yielded_context["KGridFormDataManager"]
    assert isinstance(data, dict)
    assert "dimensions" in data
    assert "shifts" in data
    assert "divisor" in data
    assert "gridMetricType" in data

    assert data["dimensions"] == expected_dimensions
    assert data["shifts"] == expected_shifts
    assert data["divisor"] == expected_divisor
