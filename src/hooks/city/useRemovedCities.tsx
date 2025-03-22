import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../state-manager/uiSlice";
import { getRemovedCitiesWeather } from "../../state-manager/citySlice";
import { CITIES } from "../../state-manager/citySlice";
import { RootState, AppDispatch } from "../../state-manager/store";

const STORAGE_KEY = "removedCitiesId";

export default function useRemovedCities() {
  const dispatch: AppDispatch = useDispatch();
  const { removedCitiesId, showRemovedCities } = useSelector(
    (state: RootState) => state.ui
  );
  const { removedCities } = useSelector((state: RootState) => state.city);

  useEffect(() => {
    const cityIdsString = localStorage?.getItem(STORAGE_KEY) || "[]";
    const cityIds = JSON.parse(cityIdsString) as number[];

    dispatch(uiActions.changeRemovedCitiesId(cityIds));
  }, [dispatch]);

  useEffect(() => {
    const removedCities = CITIES.filter((city) =>
      removedCitiesId.includes(city.cityId)
    );
    dispatch(getRemovedCitiesWeather(removedCities));
  }, [dispatch, removedCitiesId]);

  const toggleRemovedCityId = (cityId: number) => {
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

  useEffect(() => {
    if (removedCitiesId.length === 0) toggleShowRemovedCities();
    // eslint-disable-next-line
  }, [removedCitiesId.length]);

  return {
    toggleRemovedCityId,
    removedCitiesId,
    removedCities,
    showRemovedCities,
    toggleShowRemovedCities,
  };
}
