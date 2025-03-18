import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../state-manager/uiSlice";
import { RootState } from "../../state-manager/store";

const STORAGE_KEY = "favoriteCities";

export default function useFavoriteCities() {
  const dispatch = useDispatch();
  const { favoriteCitiesIds } = useSelector((state: RootState) => state.ui);

  const setFavoriteCities = (cities: string[]) => {
    dispatch(uiActions.changeFavoriteCitiesIds(cities));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setFavoriteCities(stored ? JSON.parse(stored) : []);
  }, []);

  const toggleFavoriteCityId = (cityId: string) => {
    console.log(cityId);
    console.log(favoriteCitiesIds);
    console.log(favoriteCitiesIds.includes(cityId));
    setFavoriteCities(
      favoriteCitiesIds.includes(cityId)
        ? favoriteCitiesIds.filter((c) => c !== cityId)
        : [...favoriteCitiesIds, cityId]
    );
  };

  return { favoriteCitiesIds, toggleFavoriteCityId };
}
