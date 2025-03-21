import { useEffect, useMemo } from "react";
import Header1 from "../../components/headers/Header1";
import CityWeatherCard from "./CityWeatherCard";
import Spinner from "../../components/general/Spinner";
import { BIGGEST_CITIES } from "../../state-manager/citySlice";
import { useDispatch, useSelector } from "react-redux";
import useFavoriteCities from "../../hooks/city/useFavoriteCities";
import useRemovedCities from "../../hooks/city/useRemovedCities";
import { getCitiesWeather } from "../../state-manager/citySlice";
import { RootState, AppDispatch } from "../../state-manager/store";

export default function Cities() {
  const dispatch: AppDispatch = useDispatch();
  const { citiesWeather, fetchingCitiesWeather, fetchingCitiesWeatherError } =
    useSelector((state: RootState) => state.city);
  const { maxNumberOfCities } = useSelector((state: RootState) => state.ui);
  const { favoriteCitiesIds, toggleFavoriteCityId } = useFavoriteCities();
  const { toggleRemovedCityId, removedCitiesIds } = useRemovedCities();

  useEffect(() => {
    const remainingCities = BIGGEST_CITIES.filter(
      (city) => !removedCitiesIds.includes(city.cityId)
    );
    const maxRemainingCities = remainingCities.slice(0, maxNumberOfCities);
    dispatch(getCitiesWeather(maxRemainingCities));
  }, [dispatch, maxNumberOfCities]);

  const displayedBiggestCities = useMemo(() => {
    const citiesWeatherCopy = citiesWeather.slice();
    
    const favoriteCities = citiesWeatherCopy.filter((city) =>
      favoriteCitiesIds.includes(city.cityId)
    );

    const nonFavoriteCities = citiesWeatherCopy.filter(
      (city) => !favoriteCitiesIds.includes(city.cityId)
    );

    const sortedFavoriteCities = favoriteCities.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const sortedNonFavoriteCities = nonFavoriteCities.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return [...sortedFavoriteCities, ...sortedNonFavoriteCities];
  }, [citiesWeather, favoriteCitiesIds]);

  if (fetchingCitiesWeather) {
    return (
      <div className="h-80 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (fetchingCitiesWeatherError) {
    return (
      <div className="h-80 flex items-center justify-center">
        <p className="text-white text-lg sm:text-xl text-center">
          {fetchingCitiesWeatherError}
        </p>
      </div>
    );
  }

  return (
    <div className="mb-[1rem]">
      <Header1 className="mb-[2.7rem]">Cities</Header1>
      <div className="flex justify-start gap-[30px] flex-wrap">
        {displayedBiggestCities.map((wr) => (
          <CityWeatherCard
            key={wr?.name + wr?.name}
            weatherResponse={wr}
            toggleFavorite={toggleFavoriteCityId}
            toggleRemoved={toggleRemovedCityId}
            isFavorite={favoriteCitiesIds.includes(wr.cityId)}
          />
        ))}
      </div>
    </div>
  );
}
