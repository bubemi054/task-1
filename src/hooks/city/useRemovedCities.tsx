import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../state-manager/uiSlice";
import { RootState } from "../../state-manager/store";

const STORAGE_KEY = "removedCities";

export default function useRemovedCities() {
  const dispatch = useDispatch();
  const { removedCities } = useSelector((state: RootState) => state.ui);

  const setRemovedCities = (cities: string[]) => {
    dispatch(uiActions.changeRemovedCities(cities));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setRemovedCities(stored ? JSON.parse(stored) : []);
  }, []);

  const toggleRemoved = (city: string) => {
    setRemovedCities(
      removedCities.includes(city)
        ? removedCities.filter((c) => c !== city)
        : [...removedCities, city]
    );
  };

  return { removedCities, toggleRemoved };
}
