import { useEffect } from "react";
import Header1 from "../../components/headers/Header1";
import CityWeatherCard from "./CityWeatherCard";
// import Spinner from "../../components/general/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getFavoriteCities, CITIES } from "../../state-manager/citySlice";
import useFavoriteCities from "../../hooks/city/useFavoriteCities";
import useRemovedCities from "../../hooks/city/useRemovedCities";
import { uiActions } from "../../state-manager/uiSlice";
import { RootState, AppDispatch } from "../../state-manager/store";

export default function FavoriteCities() {
  const dispatch: AppDispatch = useDispatch();
  const { favoriteCities, fetchingFavoriteCities } = useSelector(
    (state: RootState) => state.city
  );
  const { favoriteCitiesIds, toggleFavoriteCityId } = useFavoriteCities();
  const { toggleRemovedCityId, removedCitiesIds } = useRemovedCities();

  useEffect(() => {
    const cities = CITIES.slice().filter((city) =>
      favoriteCitiesIds.includes(city.cityId)
    );
    const remainingCities = cities.filter(
      (city) => !removedCitiesIds.includes(city.cityId)
    );
    const sortedRemainingCities = remainingCities.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    dispatch(getFavoriteCities(sortedRemainingCities));
  }, [favoriteCitiesIds, removedCitiesIds, dispatch]);

  const showRemovedCitiesBtn = removedCitiesIds.length > 0;

  return (
    <div className="mb-4 sm:mb-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <Header1>Favorite Cities</Header1>

        {showRemovedCitiesBtn && (
          <button
            onClick={() => dispatch(uiActions.toggleShowRemovedCities())}
            className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 rounded-lg bg-white text-black text-lg sm:text-base font-extrabold leading-normal font-manrope cursor-pointer"
          >
            Removed Cities
          </button>
        )}
      </div>
      {/* {fetchingFavoriteCities && (
        <div className="h-80 flex items-center justify-center">
          <Spinner />
        </div>
      )} */}

      {/* {!fetchingFavoriteCities && favoriteCities?.length > 0 && ( */}
      {favoriteCities?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {favoriteCities?.map((wr) => (
            <CityWeatherCard
              key={wr?.cityId + wr?.name}
              weatherResponse={wr}
              toggleFavorite={toggleFavoriteCityId}
              toggleRemoved={toggleRemovedCityId}
              isFavorite={true}
            />
          ))}
        </div>
      )}
      {!fetchingFavoriteCities && favoriteCities?.length == 0 && (
        <div className="h-24 flex items-center justify-center">
          <p className="text-white text-lg sm:text-xl font-medium">
            No favorites available
          </p>
        </div>
      )}
    </div>
  );
}
