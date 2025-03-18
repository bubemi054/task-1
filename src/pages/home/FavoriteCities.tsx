import { useMemo } from "react";
import Header1 from "../../components/headers/Header1";
import CityWeatherCard from "./CityWeatherCard";
import { useSelector, useDispatch } from "react-redux";
import useFavoriteCities from "../../hooks/city/useFavoriteCities";
import useRemovedCities from "../../hooks/city/useRemovedCities";
import RemovedCities from "./RemovedCities";
import { uiActions } from "../../state-manager/uiSlice";
import { RootState } from "../../state-manager/store";

export default function FavoriteCities() {
  const dispatch = useDispatch();
  const { citiesWeather } = useSelector((state: RootState) => state.city);
  const { showRemovedCities } = useSelector((state: RootState) => state.ui);
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
    <>
      <div className="mb-[1rem]">
        <div className="mb-[2.7rem] flex justify-between items-flex-end">
          <Header1 className="">Favorite Cities</Header1>
          <div className="flex flex-col items-end gap-2 relative">
            {showRemovedCitiesBtn && (
              <button
                onClick={() => dispatch(uiActions.toggleShowRemovedCities())}
                className="inline-flex cursor-pointer justify-center items-center pl-[1.5625rem] pr-6 py-[0.8125rem] rounded-[0.9375rem] bg-white text-black text-base not-italic font-bold leading-[normal] font-manrope"
              >
                Removed Cities
              </button>
            )}
            {showRemovedCities && <RemovedCities />}
          </div>
        </div>
        {cities?.length > 0 ? (
          <div className="flex justify-start gap-[30px] flex-wrap">
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
          <div className="h-[6rem] flex items-center justify-center">
            <p className="text-white text-xl not-italic font-medium leading-[normal] opacity-50">
              No favourites available
            </p>
          </div>
        )}
      </div>
    </>
  );
}
