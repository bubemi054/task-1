import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../state-manager/uiSlice";
import { getRemovedCitiesWeather } from "../../state-manager/citySlice";
import { useIsOnline } from "react-use-is-online";
import { CITIES } from "../../state-manager/citySlice";
import { RootState, AppDispatch } from "../../state-manager/store";
import { useNavigate } from "react-router";

const STORAGE_KEY = "removedCitiesId";

export default function useRemovedCities() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { removedCitiesId, showRemovedCities } = useSelector(
    (state: RootState) => state.ui,
  );
  const { removedCities } = useSelector((state: RootState) => state.city);
  const { isOffline } = useIsOnline();

  useEffect(() => {
    if (isOffline) return;
    const cityIdsString = localStorage?.getItem(STORAGE_KEY) || "[]";
    const cityIds = JSON.parse(cityIdsString) as number[];

    dispatch(uiActions.changeRemovedCitiesId(cityIds));
  }, [dispatch, isOffline]);

  useEffect(() => {
    if (isOffline) return;
    const removedCities = CITIES.filter((city) =>
      removedCitiesId.includes(city.cityId),
    );
    dispatch(getRemovedCitiesWeather(removedCities));
  }, [dispatch, removedCitiesId, isOffline]);

  const toggleRemovedCityId = (cityId: number) => {
    if (isOffline) return;
    let newCitiesId = [];
    if (removedCitiesId.includes(cityId)) {
      newCitiesId = removedCitiesId.filter((id) => id != cityId);
      dispatch(uiActions.changeRemovedCitiesId(newCitiesId));
    } else {
      newCitiesId = [...removedCitiesId, cityId];
      dispatch(uiActions.changeRemovedCitiesId(newCitiesId));
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCitiesId));
  };

  const toggleShowRemovedCities = () => {
    dispatch(uiActions.toggleShowRemovedCities());
  };

  const changeShowRemovedCities = (val: boolean) => {
    dispatch(uiActions.changeShowRemovedCities(val));
  };

  const viewInDetail = (cityId: number) => {
    navigate(`/city/${cityId}`);
  }

  useEffect(() => {
    if (removedCitiesId.length === 0) changeShowRemovedCities(false);
    // eslint-disable-next-line
  }, [removedCitiesId.length]);

  return {
    toggleRemovedCityId,
    removedCitiesId,
    removedCities,
    showRemovedCities,
    toggleShowRemovedCities,
    viewInDetail
  };
}
