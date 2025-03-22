import React, { useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import { useSelector } from "react-redux";
import { RootState } from "../../state-manager/store";
import { useIsOnline } from "react-use-is-online";
import { useNavigate } from "react-router";
import { areCoordinatesClose } from "../../utils/location";

export default function useCurrentCity() {
  const navigate = useNavigate();
  const { userWeather } = useSelector((state: RootState) => state.city);

  const { coords, isGeolocationAvailable } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const { isOffline } = useIsOnline();

  const viewCurrentCityWeather = () =>
    navigate(`/city/0?current-location=true`);

  useEffect(() => {
    if (isOffline || !isGeolocationAvailable) return;

    const oldLat = userWeather?.latitude || 0;
    const oldLon = userWeather?.longitude || 0;
    const newLat = coords?.latitude || 0;
    const newLon = coords?.longitude || 0;

    const showPrompts = () => {
      if (!oldLat || !oldLon) {
        const ans = window.confirm(
          "Do you want to view your current locations weather? \n You can always click the profile icon to view your locations wether."
        );

        if (ans) {
          viewCurrentCityWeather();
        }

        return;
      }

      // if(newLat === oldLat && newLon === oldLon) return;
      // console.log(oldLat, oldLon, newLat, newLon);

      // const isClose = areCoordinatesClose(oldLat, oldLon, newLat, newLon, 5);
      // if (!isClose) {
      //   const ans = window.confirm(
      //     "Your location has changed. Do you want to view your current locations wether? \n You can always click the profile icon to view your locations wether."
      //   );

      //   if (ans) {
      //     viewCurrentCityWeather();
      //   }

      //   return;
      // }
    };

    const id = setTimeout(() => {
      showPrompts();
    }, 2000);

    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line
  }, [isOffline, isGeolocationAvailable, userWeather, coords]);
}
