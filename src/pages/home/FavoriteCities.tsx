import { useEffect } from "react";
import Header1 from "../../components/headers/Header1";
import CityWeatherCard from "./CityWeatherCard";
// import Spinner from "../../components/general/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { getFavoriteCities, CITIES } from "../../state-manager/citySlice";
import useFavoriteCities from "../../hooks/city/useFavoriteCities";
import useRemovedCities from "../../hooks/city/useRemovedCities";
import RemovedCities from "./RemovedCities";
import { uiActions } from "../../state-manager/uiSlice";
import { RootState, AppDispatch } from "../../state-manager/store";

export default function FavoriteCities() {
  const dispatch: AppDispatch = useDispatch();
  const { favoriteCities, fetchingFavoriteCities } = useSelector(
    (state: RootState) => state.city
  );
  const { favoriteCitiesIds, toggleFavoriteCityId } = useFavoriteCities();
  const { toggleRemovedCityId, removedCitiesIds, showRemovedCities } = useRemovedCities();

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

  return (
    <div className="mb-4 sm:mb-6">
      <div className="mb-[2.7rem] flex justify-between items-flex-end">
          <Header1 className="">Favorite Cities</Header1>
          <div className="flex flex-col items-end gap-2 relative">
            {removedCitiesIds.length > 0 && (
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
      {favoriteCities?.length > 0 && (
        <div className="flex justify-start gap-[30px] flex-wrap">
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
