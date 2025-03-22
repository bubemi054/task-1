import React, { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCitiesWeather } from "../../state-manager/citySlice";
import useRemovedCities from "./useRemovedCities";
import { BIGGEST_CITIES } from "../../state-manager/citySlice";
import { RootState, AppDispatch } from "../../state-manager/store";
import { useIsOnline } from "react-use-is-online";

export default function useBiggestCities() {
  const dispatch: AppDispatch = useDispatch();
  const { maxNumberOfCities } = useSelector((state: RootState) => state.ui);
  const { citiesWeather, fetchingCitiesWeather, fetchingCitiesWeatherError } =
    useSelector((state: RootState) => state.city);
  const { removedCitiesId } = useRemovedCities();
  const { isOffline } = useIsOnline();

  useEffect(() => {
    if (isOffline) return;

    const remainingBiggestCities = BIGGEST_CITIES.filter(
      (city) => !removedCitiesId.includes(city.cityId)
    );
    const maxRemainingBiggestCities = remainingBiggestCities.slice(
      0,
      maxNumberOfCities
    );
    dispatch(getCitiesWeather(maxRemainingBiggestCities));
  }, [dispatch, maxNumberOfCities, removedCitiesId, isOffline]);

  const sortedCitiesWeather = useMemo(() => {
    return citiesWeather.slice().sort((a, b) => a.name.localeCompare(b.name));
  }, [citiesWeather]);

  return {
    citiesWeather,
    fetchingCitiesWeather,
    fetchingCitiesWeatherError,
    sortedCitiesWeather,
  };
}
