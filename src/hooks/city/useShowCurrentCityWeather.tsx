// @ts-expect-error Need React imported for my tests
import React, { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { useSelector, useDispatch } from "react-redux";
import { useIsOnline } from "react-use-is-online";
import { useNavigate } from "react-router";
import { CITIES } from "../../state-manager/citySlice";
import { findClosestCity } from "../../utils/city-location";
import { cityActions } from "../../state-manager/citySlice";
import { City } from "../../state-manager/types";
import type { RootState, AppDispatch } from "../../state-manager/store";

export default function useShowCurrentCityWeather() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { recentCurrentCity } = useSelector((state: RootState) => state.city);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: false },
      userDecisionTimeout: 10000,
    });
  const { isOffline } = useIsOnline();

  const changeRecentCurrentCity = (city: City) => {
    dispatch(cityActions.updateRecentCurrentCity(city));
  };

  const viewCurrentCityWeather = () => {
    if (isOffline) return;
    if (recentCurrentCity) {
      navigate(`/city/${recentCurrentCity.cityId}`);
    }
  };

  useEffect(() => {
    if (coords && isGeolocationAvailable && isGeolocationEnabled) {
      const newLat = coords?.latitude || 0;
      const newLon = coords?.longitude || 0;

      const closestCity = findClosestCity(CITIES, [newLat, newLon]);

      if (closestCity) {
        console.log("recent city set");
        changeRecentCurrentCity(closestCity);
      }
    }
  }, [coords]);

  return { viewCurrentCityWeather };
}
