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

  const { coords, isGeolocationAvailable } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const { isOffline } = useIsOnline();

  const oldLat = recentCurrentCity?.loc.coordinates[0] || 0;
  const oldLon = recentCurrentCity?.loc.coordinates[1] || 0;
  const newLat = coords?.latitude || 0;
  const newLon = coords?.longitude || 0;

  const viewCurrentCityWeather = () => {
    if (isOffline) return;
    navigate(`/city/${recentCurrentCity?.cityId}`);
  };

  useEffect(() => {
    const currentCity = findClosestCity(CITIES, [newLat, newLon]);

    if (currentCity) {
      dispatch(cityActions.updateRecentCurrentCity(currentCity));
    }
  }, [dispatch, newLat, newLon]);

  useEffect(() => {
    if (isOffline || !isGeolocationAvailable) return;

    const showPrompts = () => {
      console.log(oldLat);
      console.log(oldLon);
      if (!oldLat || !oldLon) {
        const ans = window.confirm(
          "Do you want to view your current locations weather?\nYou can always click the profile icon to view your locations wether.",
        );

        if (ans) {
          viewCurrentCityWeather();
        }

        return;
      }
    };

    const id = setTimeout(() => {
      showPrompts();
    }, 3000);

    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line
  }, [isOffline, isGeolocationAvailable, coords]);

  console.log("bvjh");

  return { viewCurrentCityWeather };
}
