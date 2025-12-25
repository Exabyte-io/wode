from typing import Any, Dict, List

from mat3ra.ade.context.context_provider import ContextProvider
from mat3ra.esse.models.context_providers_directory.enum import ContextProviderNameEnum
from mat3ra.esse.models.context_providers_directory.points_grid_data_provider import (
    GridMetricType,
    PointsGridDataProviderSchema,
)
from pydantic import Field


# TODO: GlobalSetting for default KPPRA value
class PointsGridDataProvider(PointsGridDataProviderSchema, ContextProvider):
    """
    Context provider for k-point/q-point grid configuration.

    Handles grid dimensions and shifts for reciprocal space sampling.
    """

    name: str = Field(default="kgrid")
    divisor: int = Field(default=1)
    dimensions: List[int] = Field(default_factory=lambda: [1, 1, 1])
    shifts: List[float] = Field(default_factory=lambda: [0.0, 0.0, 0.0])
    grid_metric_type: str = Field(default=GridMetricType.KPPRA)

    @property
    def is_edited_key(self) -> str:
        return "isKgridEdited"

    @property
    def default_data(self) -> Dict[str, Any]:
        return {
            "dimensions": self.dimensions,
            "shifts": self.shifts,
            "gridMetricType": self.grid_metric_type,
            "divisor": self.divisor,
        }

    # TODO: add a test to verify context and templates are the same as from JS implementation
    def get_default_grid_metric_value(self, metric: str) -> float:
        raise NotImplementedError

    def calculate_dimensions(
            self, grid_metric_type: str, grid_metric_value: float, units: str = "angstrom"
    ) -> List[int]:
        raise NotImplementedError

    def calculate_grid_metric(self, grid_metric_type: str, dimensions: List[int], units: str = "angstrom") -> float:
        raise NotImplementedError

    def transform_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        raise NotImplementedError
