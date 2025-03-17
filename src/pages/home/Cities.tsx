import { useEffect, useMemo } from "react";
import Header1 from "../../components/headers/Header1";
import CityWeatherCard from "./CityWeatherCard";
import Spinner from "../../components/general/Spinner";
import { BIGGEST_CITIES } from "../../state-manager/uiSlice";
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
  const { favoriteCities, toggleFavorite } = useFavoriteCities();
  const { toggleRemoved, removedCities } = useRemovedCities();

  useEffect(() => {
    dispatch(getCitiesWeather(BIGGEST_CITIES));
  }, []);

  const sortedAndFilteredCitiesWeather = useMemo(() => {
    const remainingCities = citiesWeather
      ?.slice()
      .filter((city) => !removedCities.includes(city.name));

    const sortedCities = remainingCities.sort((a, b) => {
      const aIsFavorite = favoriteCities.includes(a.name);
      const bIsFavorite = favoriteCities.includes(b.name);

      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      return a.name.localeCompare(b.name);
    });

    return sortedCities.slice(0, maxNumberOfCities);
  }, [citiesWeather, removedCities, favoriteCities, maxNumberOfCities]);

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
    <div className="mb-6 sm:mb-10">
      <Header1 className="mb-6 sm:mb-10">Cities</Header1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {sortedAndFilteredCitiesWeather.map((wr) => (
          <CityWeatherCard
            key={wr?.name}
            weatherResponse={wr}
            toggleFavorite={toggleFavorite}
            toggleRemoved={toggleRemoved}
            isFavorite={favoriteCities.includes(wr.name)}
          />
        ))}
      </div>
    </div>
  );
}
