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
    viewInDetail
  } = useRemovedCities();

  return (
    <>
      <div className="mb-[2rem]">
        <div className="mb-6 flex flex-row items-center justify-between">
          <Header1 className="w-full text-center sm:text-left">
            Favorite Cities
          </Header1>
          <div className="relative flex flex-col items-end">
            {removedCities?.length > 0 && (
              <button
                onClick={toggleShowRemovedCities}
                className="font-manrope inline-flex cursor-pointer items-center justify-center truncate rounded-lg bg-white px-2 py-2 text-sm leading-normal font-bold text-black transition-all duration-200 hover:bg-gray-200 sm:px-6 sm:text-base lg:text-lg"
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {sortedFavoriteCities.map((wr) => (
              <CityWeatherCard
                key={wr?.cityId}
                weatherResponse={wr}
                toggleFavorite={toggleFavoriteCityId}
                viewInDetail={viewInDetail}
                toggleRemoved={toggleRemovedCityId}
                isFavorite={true}
                className=""
              />
            ))}
          </div>
        ) : (
          <div className="flex h-24 items-center justify-center">
            <p className="text-center text-lg font-medium text-white opacity-50 sm:text-xl">
              No favorites available
            </p>
          </div>
        )}
      </div>
    </>
  );
}
