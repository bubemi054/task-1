// @ts-expect-error Need React imported for my tests
import React from "react";
import Header1 from "../../components/headers/Header1";
import CityWeatherCard from "./CityWeatherCard";
import Spinner from "../../components/general/Spinner";
import useBiggestCities from "../../hooks/city/useBiggestCities";
import useFavoriteCities from "../../hooks/city/useFavoriteCities";
import useRemovedCities from "../../hooks/city/useRemovedCities";

export default function Cities() {
  const { toggleFavoriteCityId, favoriteCitiesId, viewInDetail } = useFavoriteCities();
  const { toggleRemovedCityId } = useRemovedCities();
  const {
    fetchingCitiesWeather,
    fetchingCitiesWeatherError,
    sortedCitiesWeather,
  } = useBiggestCities();

  if (fetchingCitiesWeather) {
    return (
      <div className="flex h-80 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (fetchingCitiesWeatherError) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-center text-lg text-white sm:text-xl">
          {fetchingCitiesWeatherError}
        </p>
      </div>
    );
  }

  return (
    <div className="mb-[1rem]">
      <Header1 className="mb-[2.7rem] text-center sm:text-left">Cities</Header1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {sortedCitiesWeather.map((wr) => (
          <CityWeatherCard
            key={wr?.cityId}
            weatherResponse={wr}
            toggleFavorite={toggleFavoriteCityId}
            toggleRemoved={toggleRemovedCityId}
            viewInDetail={viewInDetail}
            isFavorite={favoriteCitiesId.includes(wr.cityId)}
          />
        ))}
      </div>
    </div>
  );
}
