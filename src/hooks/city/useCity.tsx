// @ts-expect-error Need React imported for my tests
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGeolocated } from "react-geolocated";
import useRemovedCities from "./useRemovedCities";
import useFavoriteCities from "./useFavoriteCities";
import { getCityWeather } from "../../state-manager/citySlice";
import { CITIES } from "../../state-manager/citySlice";
import { AppDispatch, RootState } from "../../state-manager/store";

const MAX_POPULAR_CITIES = 8;

export default function useCity(cityId: string | undefined) {
  const dispatch: AppDispatch = useDispatch();
  const { citiesWeather, cityWeather, fetchingCityWeather } = useSelector(
    (state: RootState) => state.city,
  );
  const { removedCitiesId } = useRemovedCities();
  const { toggleFavoriteCityId, favoriteCitiesId } = useFavoriteCities();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (typeof cityId !== "string") return;

    const foundCity = CITIES.find((city) => city.cityId === Number(cityId));

    if (foundCity) {
      dispatch(getCityWeather(foundCity));
    }
  }, [dispatch, isGeolocationAvailable, coords, cityId]);

  const remainingBiggestCities = useMemo(() => {
    return citiesWeather
      .filter((city) => !removedCitiesId.includes(city.cityId))
      ?.slice(0, MAX_POPULAR_CITIES);
  }, [citiesWeather, removedCitiesId]);

  return {
    citiesWeather,
    cityWeather: cityWeather,
    fetchingCityWeather: fetchingCityWeather,
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    remainingBiggestCities,
    toggleFavoriteCityId,
    favoriteCitiesId,
  };
}
