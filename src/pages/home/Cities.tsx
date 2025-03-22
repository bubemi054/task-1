import Reac from "react";
import Header1 from "../../components/headers/Header1";
import CityWeatherCard from "./CityWeatherCard";
import Spinner from "../../components/general/Spinner";
import useBiggestCities from "../../hooks/city/useBiggestCities";
import useFavoriteCities from "../../hooks/city/useFavoriteCities";
import useRemovedCities from "../../hooks/city/useRemovedCities";

export default function Cities() {
  const { toggleFavoriteCityId, favoriteCitiesId } = useFavoriteCities();
  const { toggleRemovedCityId } = useRemovedCities();
  const {
    fetchingCitiesWeather,
    fetchingCitiesWeatherError,
    sortedCitiesWeather,
  } = useBiggestCities();

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
      <Header1 className="mb-[2.7rem] text-center sm:text-left">Cities</Header1>
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8">
        {sortedCitiesWeather.map((wr) => (
          <CityWeatherCard
            key={wr?.cityId}
            weatherResponse={wr}
            toggleFavorite={toggleFavoriteCityId}
            toggleRemoved={toggleRemovedCityId}
            isFavorite={favoriteCitiesId.includes(wr.cityId)}
          />
        ))}
      </div>
    </div>
  );
}
