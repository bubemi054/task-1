import React from "react";
import Header1 from "../../components/headers/Header1";
import CityWeatherCard from "./CityWeatherCard";
import RemovedCities from "./RemovedCities";
import useFavoriteCities from "../../hooks/city/useFavoriteCities";
import useRemovedCities from "../../hooks/city/useRemovedCities";
import ClickAwayListener from "react-click-away-listener";

export default function FavoriteCities() {
  const { sortedFavoriteCities, toggleFavoriteCityId } = useFavoriteCities();
  const {
    removedCities,
    toggleRemovedCityId,
    showRemovedCities,
    toggleShowRemovedCities,
  } = useRemovedCities();

  return (
    <>
      <div className="mb-[2rem]">
        <div className="mb-6 flex flex-row justify-between items-center">
          <Header1 className="text-left sm:text-center">
            Favorite Cities
          </Header1>
          <div className="flex flex-col items-end relative">
            {removedCities?.length > 0 && (
              <button
                onClick={toggleShowRemovedCities}
                className="inline-flex cursor-pointer justify-center items-center  px-2 py-2 sm:px-6 rounded-lg bg-white text-black  text-sm sm:text-base lg:text-lg  font-bold leading-normal font-manrope transition-all duration-200 hover:bg-gray-200"
              >
                Removed Cities
              </button>
            )}
            {showRemovedCities && (
              <ClickAwayListener onClickAway={toggleShowRemovedCities}>
                <RemovedCities
                  toggleRemovedCityId={toggleRemovedCityId}
                  removedCities={removedCities}
                />
              </ClickAwayListener>
            )}
          </div>
        </div>

        {sortedFavoriteCities?.length > 0 ? (
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8">
            {sortedFavoriteCities.map((wr) => (
              <CityWeatherCard
                key={wr?.cityId}
                weatherResponse={wr}
                toggleFavorite={toggleFavoriteCityId}
                toggleRemoved={toggleRemovedCityId}
                isFavorite={true}
                className="w-full sm:w-auto"
              />
            ))}
          </div>
        ) : (
          <div className="h-24 flex items-center justify-center">
            <p className="text-white text-lg sm:text-xl font-medium opacity-50 text-center">
              No favorites available
            </p>
          </div>
        )}
      </div>
    </>
  );
}
