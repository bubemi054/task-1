import React, { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../state-manager/uiSlice";
import { getFavoriteCitiesWeather } from "../../state-manager/citySlice";
import useRemovedCities from "./useRemovedCities";
import { CITIES } from "../../state-manager/citySlice";
import { RootState, AppDispatch } from "../../state-manager/store";

const STORAGE_KEY = "favoriteCitiesId";

export default function useFavoriteCities() {
  const dispatch: AppDispatch = useDispatch();
  const { favoriteCitiesId } = useSelector((state: RootState) => state.ui);
  const { favoriteCities } = useSelector((state: RootState) => state.city);
  const { removedCitiesId } = useRemovedCities();

  useEffect(() => {
    const cityIdsString = localStorage?.getItem(STORAGE_KEY) || "[]";
    const cityIds = JSON.parse(cityIdsString) as number[];

    dispatch(uiActions.changeFavoriteCitiesId(cityIds));
  }, [dispatch]);

  useEffect(() => {
    const favoriteCities = CITIES.filter((city) =>
      favoriteCitiesId.includes(city.cityId)
    );
    // console.log(favoriteCities);
    const remainingFavoriteCities = favoriteCities.filter(
      (city) => !removedCitiesId.includes(city.cityId)
    );
    // console.log(remainingFavoriteCities);
    dispatch(getFavoriteCitiesWeather(remainingFavoriteCities));
  }, [dispatch, favoriteCitiesId, removedCitiesId]);

  const toggleFavoriteCityId = (cityId: number) => {
    let newCitiesId = [];
    if (favoriteCitiesId.includes(cityId)) {
      newCitiesId = favoriteCitiesId.filter((id) => id != cityId);
      dispatch(uiActions.changeFavoriteCitiesId(newCitiesId));
    } else {
      newCitiesId = [...favoriteCitiesId, cityId];
      dispatch(uiActions.changeFavoriteCitiesId(newCitiesId));
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCitiesId));
  };

  const sortedFavoriteCities = useMemo(() => {
    return favoriteCities.slice().sort((a, b) => a.name.localeCompare(b.name));
  }, [favoriteCities]);

  return {
    toggleFavoriteCityId,
    favoriteCitiesId,
    favoriteCities,
    sortedFavoriteCities,
  };
}
