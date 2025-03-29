// @ts-expect-error Need React imported for my tests
import React, { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { useSelector, useDispatch } from "react-redux";
import { useIsOnline } from "react-use-is-online";
import { useNavigate } from "react-router";
import { CITIES } from "../../state-manager/citySlice";
import { findClosestCity } from "../../utils/city-location";
import { cityActions } from "../../state-manager/citySlice";
import type { RootState, AppDispatch } from "../../state-manager/store";

export default function useShowCurrentCityWeather() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { recentCurrentCity } = useSelector((state: RootState) => state.city);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: { enableHighAccuracy: false },
    userDecisionTimeout: 5000,
  });

  const { isOffline } = useIsOnline();

  const newLat = coords?.latitude || 0;
  const newLon = coords?.longitude || 0;

  const viewCurrentCityWeather = (cityId?: number) => {
    if (isOffline) return;

    if (typeof cityId === "number") {
      navigate(`/city/${cityId}`);
    } else if (recentCurrentCity?.cityId) {
      navigate(`/city/${recentCurrentCity.cityId}`);
    }
  };

  useEffect(() => {
    if (isOffline || !coords || !isGeolocationAvailable || !isGeolocationEnabled) return;

    const currentCity = findClosestCity(CITIES, [newLat, newLon]);
    if (!currentCity) return;

    dispatch(cityActions.updateRecentCurrentCity(currentCity));

    if (recentCurrentCity === undefined) {
      setTimeout(() => {
        const ans = window.confirm(
          "Do you want to view your current location's weather?\nYou can always click the profile icon to view your location's weather."
        );

        if (ans) {
          viewCurrentCityWeather(currentCity.cityId);
        }
      }, 1500);
    }
  }, [coords, recentCurrentCity, isOffline, isGeolocationAvailable, isGeolocationEnabled]);

  return { viewCurrentCityWeather };
}
