from typing import Any, Dict, List, Optional

from mat3ra.ade.context.context_provider import ContextProvider
from mat3ra.esse.models.context_providers_directory.points_grid_data_provider import GridMetricType, \
    PointsGridDataProviderSchema
from pydantic import Field


class PointsGridDataProvider(PointsGridDataProviderSchema, ContextProvider):
    """
    Context provider for k-point/q-point grid configuration.
    
    Handles grid dimensions and shifts for reciprocal space sampling.
    """

    divisor: int = Field(default=1)
    dimensions: List[int] = Field(default_factory=lambda: [1, 1, 1])
    shifts: List[float] = Field(default_factory=lambda: [0.0, 0.0, 0.0])
    grid_metric_type: str = Field(default=GridMetricType.KPPRA)

    @property
    def default_shift(self) -> float:
        raise NotImplementedError

    @property
    def default_dimensions(self) -> List[int]:
        raise NotImplementedError

    @property
    def default_shifts(self) -> List[float]:
        raise NotImplementedError

    def get_default_grid_metric_value(self, metric: str) -> float:
        raise NotImplementedError

    @property
    def default_data(self) -> Dict[str, Any]:
        raise NotImplementedError

    def calculate_dimensions(
            self,
            grid_metric_type: str,
            grid_metric_value: float,
            units: str = "angstrom"
    ) -> List[int]:
        raise NotImplementedError

    def calculate_grid_metric(
            self,
            grid_metric_type: str,
            dimensions: List[int],
            units: str = "angstrom"
    ) -> float:
        raise NotImplementedError

    def transform_data(self, data: Dict[str, Any]) -> Dict[str, Any]:
        raise NotImplementedError

    def get_data(self, dimensions: Optional[List[int]] = None) -> Dict[str, Any]:
        raise NotImplementedError
