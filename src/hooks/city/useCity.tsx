import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCityWeather } from "../../state-manager/citySlice";
import { AppDispatch, RootState } from "../../state-manager/store";

export default function useCity(cityId: string | undefined) {
  const dispatch: AppDispatch = useDispatch();
  const { citiesWeather, cityWeather, fetchingCityWeather } = useSelector(
    (state: RootState) => state.city
  );

  useEffect(() => {
    if (typeof cityId !== "string") return;

    const foundCity = citiesWeather.find(
      (city) => city.cityId === Number(cityId)
    );

    if (foundCity) {
      dispatch(getCityWeather(foundCity));
    }
  }, [cityId]);

  return { citiesWeather, cityWeather, fetchingCityWeather };
}
