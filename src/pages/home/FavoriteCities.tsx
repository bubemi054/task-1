import { useMemo } from "react";
import Header1 from "../../components/headers/Header1";
import CityWeatherCard from "./CityWeatherCard";
import { useSelector, useDispatch } from "react-redux";
import useFavoriteCities from "../../hooks/city/useFavoriteCities";
import useRemovedCities from "../../hooks/city/useRemovedCities";
import { uiActions } from "../../state-manager/uiSlice";
import { RootState } from "../../state-manager/store";

export default function FavoriteCities() {
  const dispatch = useDispatch();
  const { citiesWeather } = useSelector((state: RootState) => state.city);
  const { favoriteCities, toggleFavorite } = useFavoriteCities();
  const { toggleRemoved, removedCities } = useRemovedCities();

  const cities = useMemo(() => {
    const favCities = citiesWeather
      ?.slice()
      .filter((city) => favoriteCities.includes(city.name));

    const remainingCities = favCities.filter(
      (city) => !removedCities.includes(city.name)
    );

    const sortedCities = remainingCities?.slice().sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return sortedCities;
  }, [citiesWeather, favoriteCities, removedCities]);

  const showRemovedCitiesBtn = removedCities?.length > 0;

  return (
    <div className="mb-4 sm:mb-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <Header1>Favorite Cities</Header1>

        {showRemovedCitiesBtn && (
          <button
            onClick={() => dispatch(uiActions.toggleShowRemovedCities())}
            className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 rounded-lg bg-white text-black text-lg sm:text-base font-extrabold leading-normal font-manrope"
          >
            Removed Cities
          </button>
        )}
      </div>

      {cities?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cities.map((wr) => (
            <CityWeatherCard
              key={wr?.name}
              weatherResponse={wr}
              toggleFavorite={toggleFavorite}
              toggleRemoved={toggleRemoved}
              isFavorite={true}
            />
          ))}
        </div>
      ) : (
        <div className="h-24 flex items-center justify-center">
          <p className="text-white text-lg sm:text-xl font-medium">
            No favorites available
          </p>
        </div>
      )}
    </div>
  );
}
