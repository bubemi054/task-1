import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../state-manager/uiSlice";
import { RootState } from "../../state-manager/store";

const STORAGE_KEY = "removedCities";

export default function useRemovedCities() {
  const dispatch = useDispatch();
  const { removedCitiesIds, showRemovedCities } = useSelector((state: RootState) => state.ui);

  const setRemovedCities = (cities: string[]) => {
    dispatch(uiActions.changeRemovedCitiesIds(cities));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setRemovedCities(stored ? JSON.parse(stored) : []);
  }, []);

  const toggleRemovedCityId = (cityId: string) => {
    setRemovedCities(
      removedCitiesIds.includes(cityId)
        ? removedCitiesIds.filter((c) => c !== cityId)
        : [...removedCitiesIds, cityId]
    );
  };

  return { removedCitiesIds, toggleRemovedCityId, showRemovedCities };
}
