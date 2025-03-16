import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../state-manager/uiSlice";
import { RootState } from "../../state-manager/store";

const STORAGE_KEY = "favoriteCities";

export default function useFavoriteCities() {
  const dispatch = useDispatch();
  const { favoriteCities } = useSelector((state: RootState) => state.ui);

  const setFavoriteCities = (cities: string[]) => {
    dispatch(uiActions.changeFavoriteCities(cities));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setFavoriteCities(stored ? JSON.parse(stored) : []);
  }, []);

  const toggleFavorite = (city: string) => {
    setFavoriteCities(
      favoriteCities.includes(city)
        ? favoriteCities.filter((c) => c !== city)
        : [...favoriteCities, city]
    );
  };

  return { favoriteCities, toggleFavorite };
}
