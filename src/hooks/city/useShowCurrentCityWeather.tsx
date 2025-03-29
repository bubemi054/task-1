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

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const { isOffline } = useIsOnline();

  const newLat = coords?.latitude || 0;
  const newLon = coords?.longitude || 0;

  const viewCurrentCityWeather = (cityId?: number) => {
    if (isOffline) return;

    if (typeof cityId == "number") {
      navigate(`/city/${cityId}`);
    } else {
      navigate(`/city/${recentCurrentCity?.cityId}`);
    }
  };

  useEffect(() => {
    const currentCity = findClosestCity(CITIES, [newLat, newLon]);

    if (currentCity) {
      dispatch(cityActions.updateRecentCurrentCity(currentCity));
    }
  }, [coords]);

  useEffect(() => {
    if (
      isOffline ||
      !isGeolocationAvailable ||
      !isGeolocationEnabled ||
      !coords
    )
      return;

    const showPrompts = () => {
      if (!recentCurrentCity) return;

      const ans = window.confirm(
        "Do you want to view your current locations weather?\nYou can always click the profile icon to view your locations wether.",
      );

      if (ans) {
        viewCurrentCityWeather(recentCurrentCity?.cityId);
      }

      return;
    };

    const id = setTimeout(() => {
      showPrompts();
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [
    isOffline,
    isGeolocationAvailable,
    isGeolocationEnabled,
    coords,
    recentCurrentCity,
  ]);

  return { viewCurrentCityWeather };
}
