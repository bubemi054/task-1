import React, { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { getUserWeather } from "../../state-manager/citySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../state-manager/store";

const STORAGE_KEY = "currentLocation";

export default function useCurrentCity() {
  const dispatch: AppDispatch = useDispatch();
  const { userWeather, fetchingUserWeather, fetchingUserWeatherError } =
    useSelector((state: RootState) => state.city);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    // const coordsString = localStorage?.getItem(STORAGE_KEY) || "[]";
    // const coords = JSON.parse(coordsString) as [number, number] || [0, 0];

    if (isGeolocationAvailable && coords) {
      console.log("onibu");
      dispatch(getUserWeather([coords.latitude, coords.longitude]));
    }
  }, [isGeolocationAvailable, coords, dispatch]);

  console.log(coords, isGeolocationAvailable, isGeolocationEnabled);

  return { userWeather, fetchingUserWeather, fetchingUserWeatherError };
}
