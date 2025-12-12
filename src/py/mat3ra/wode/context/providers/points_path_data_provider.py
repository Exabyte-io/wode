# TODO: We need materialContextMixin equivalent in Python
# TODO: We need applicationContextMixin equivalent in Python

from typing import Any, Dict, List

from mat3ra.ade.context.context_provider import ContextProvider
from mat3ra.esse.models.context_providers_directory.points_path_data_provider import (
    PointsPathDataProviderSchema,
)


class PointsPathDataProvider(PointsPathDataProviderSchema, ContextProvider):
    """
    Context provider for k-point/q-point path settings.
    """

    # self.init_material_context_mixin()
    # self.init_application_context_mixin()
    reciprocal_lattice: Any = None  # Made.ReciprocalLattice
    symmetry_points: List[Dict[str, Any]] = []

    @property
    def is_edited_is_set_to_false_on_material_update(self) -> bool:
        raise NotImplementedError

    @property
    def symmetry_points_from_material(self) -> List[Dict[str, Any]]:
        raise NotImplementedError

    @property
    def templates(self) -> Dict[str, Any]:
        raise NotImplementedError

    def get_brillouin_zone_image_component(self, title: str) -> Any:
        raise NotImplementedError

    @property
    def use_explicit_path(self) -> bool:
        raise NotImplementedError

    def yield_data_for_rendering(self) -> List[Dict[str, Any]]:
        raise NotImplementedError

    def transform_data(
            self, path: List[Dict[str, Any]], use_explicit_path: bool = False
    ) -> List[Dict[str, Any]]:
        raise NotImplementedError

    def get_2pi_ba_coordinates(self, point: List[float]) -> List[float]:
        raise NotImplementedError

    def _convert_to_explicit_path(self, path: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        raise NotImplementedError


class ExplicitPointsPathDataProvider(PointsPathDataProvider):
    @property
    def use_explicit_path(self) -> bool:
        return True


class ExplicitPointsPath2PIBADataProvider(ExplicitPointsPathDataProvider):
    @property
    def is_2pi_ba(self) -> bool:
        return True
