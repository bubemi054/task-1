// @ts-expect-error Need React imported for my tests
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../state-manager/uiSlice";
import { getFavoriteCitiesWeather } from "../../state-manager/citySlice";
import { useIsOnline } from "react-use-is-online";
import useRemovedCities from "./useRemovedCities";
import { CITIES } from "../../state-manager/citySlice";
import { RootState, AppDispatch } from "../../state-manager/store";
import { useNavigate } from "react-router";

const STORAGE_KEY = "favoriteCitiesId";

export default function useFavoriteCities() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { favoriteCitiesId } = useSelector((state: RootState) => state.ui);
  const { favoriteCities } = useSelector((state: RootState) => state.city);
  const { removedCitiesId } = useRemovedCities();
  const { isOffline } = useIsOnline();

  useEffect(() => {
    if (isOffline) return;
    const cityIdsString = localStorage?.getItem(STORAGE_KEY) || "[]";
    const cityIds = JSON.parse(cityIdsString) as number[];

    dispatch(uiActions.changeFavoriteCitiesId(cityIds));
  }, [dispatch, isOffline]);

  useEffect(() => {
    if (isOffline) return;
    const favoriteCities = CITIES.filter((city) =>
      favoriteCitiesId.includes(city.cityId),
    );
    const remainingFavoriteCities = favoriteCities.filter(
      (city) => !removedCitiesId.includes(city.cityId),
    );
    dispatch(getFavoriteCitiesWeather(remainingFavoriteCities));
  }, [dispatch, favoriteCitiesId, removedCitiesId, isOffline]);

  const toggleFavoriteCityId = (cityId: number) => {
    if (isOffline) return;
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

  const viewInDetail = (cityId: number) => {
    if (isOffline) return;
    navigate(`/city/${cityId}`);
  };

  return {
    toggleFavoriteCityId,
    favoriteCitiesId,
    favoriteCities,
    sortedFavoriteCities,
    viewInDetail,
  };
}
