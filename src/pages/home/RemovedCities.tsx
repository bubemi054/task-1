import React from "react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state-manager/store";
import useRemovedCities from "../../hooks/city/useRemovedCities";
import { uiActions } from "../../state-manager/uiSlice";
import { getWeatherStatus } from "../../utils/weather";
import {
  BIGGEST_CITIES,
  getRemovedCities,
} from "../../state-manager/citySlice";
import PlusIcon from "../../components/icons/PlusIcon";
import Spinner from "../../components/general/Spinner";
import type { WeatherResponse } from "../../state-manager/types";
import type { AppDispatch } from "../../state-manager/store";

export default function RemovedCities() {
  const dispatch: AppDispatch = useDispatch();
  const { removedCities, fetchingRemovedCities } = useSelector(
    (state: RootState) => state.city
  );
  const { showRemovedCities } = useSelector((state: RootState) => state.ui);
  const { toggleRemovedCityId, removedCitiesIds } = useRemovedCities();

  const closeModalHandler = () => {
    dispatch(uiActions.toggleShowRemovedCities());
  };

  useEffect(() => {
    if (removedCitiesIds?.length === 0) {
      closeModalHandler();
      return;
    }

    const blacklistedCities = BIGGEST_CITIES.filter((city) =>
      removedCitiesIds.includes(city.cityId)
    );

    dispatch(getRemovedCities(blacklistedCities));
  }, [removedCitiesIds]);

  return (
    <>
      <Modal>
        {removedCities?.map((wr) => (
          <Item key={wr.name} weatherResponse={wr} removeCity={toggleRemovedCityId} />
        ))}
      </Modal>
    </>
  );
}

function Modal({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <ul className="absolute top-[50px] flex w-[20rem] bg-white flex-col gap-3 px-3 py-2 rounded-[1.25rem]">
      {children}
    </ul>
  );
}

function Item({
  weatherResponse,
  removeCity,
}: {
  weatherResponse: WeatherResponse;
  removeCity: (city: string) => void;
}) {
  const weatherStatusColor = getWeatherStatus(
    weatherResponse.current.weathercode
  );

  return (
    <li className="w-full shadow-[0px_4px_4px_0px_rgba(29,114,207,0.15)] rounded-[0.625rem] px-[.5rem] py-[0.5rem] flex items-center justify-between">
      <span className="flex flex-col">
        <span className="text-[#6B7280] text-[10px] not-italic font-bold leading-[normal] font-manrope">
          {new Date(weatherResponse.current.time)?.toDateString()}
        </span>
        <span className="text-[#111827] text-[16px] not-italic font-extrabold leading-[normal] font-manrope">
          {weatherResponse.name}
        </span>
      </span>
      
      <div className="flex items-center justify-center gap-5">

        <span className="w-[120px] flex justify-center gap-1 items-end">
          <div className="text-left">
            <span className="bg-clip-text text-[20px] not-italic font-extrabold leading-normal bg-gradient-to-t text-transparent font-manrope from-[#111827] to-[#6B7280]">
              {weatherResponse.current.temperature_2m}
              {weatherResponse.current_units.temperature_2m}
            </span>
          </div>

          <span
            className="text-xs not-italic font-extrabold leading-[normal] font-manrope"
            style={{ color: weatherStatusColor.color }}
          >
            {weatherStatusColor.status === "Thunderstorm"
              ? "Storm"
              : weatherStatusColor.status}
          </span>
        </span>

        <PlusIcon
          onClick={() => removeCity(weatherResponse.name)}
          className="cursor-pointer"
        />
      </div>
    </li>
  );
}
