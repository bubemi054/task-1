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
  }, [dispatch, removedCitiesIds]);

  return (
    <Modal open={showRemovedCities} onClose={closeModalHandler}>
      {fetchingRemovedCities ? (
        <p className="text-black text-lg sm:text-xl text-center">
          <Spinner className="h-auto text-black" />
        </p>
      ) : (
        removedCities?.map((wr) => (
          <Item
            key={wr.name}
            weatherResponse={wr}
            removeCity={toggleRemovedCityId}
          />
        ))
      )}
    </Modal>
  );
}

function Modal({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="w-screen h-screen max-w-screen max-h-screen fixed bottom-0 right-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.50)]"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <ul className="w-full sm:max-w-[30%] max-w-[80%] max-h-[60%] overflow-y-auto bg-white flex flex-col gap-3 px-3 py-2 rounded-[1.25rem] shadow-lg">
        {children}
      </ul>
    </dialog>
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
    <li className="w-full shadow-md rounded-[0.625rem] px-4 py-2 flex items-center justify-between">
      <span className="flex flex-col">
        <span className="text-gray-500 text-xs font-medium">
          {new Date(weatherResponse.current.time).toDateString()}
        </span>
        <span className="text-gray-900 text-xl font-extrabold">
          {weatherResponse.name}
        </span>
      </span>
      <span className="flex items-end">
        <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-t from-gray-900 to-gray-500">
          {weatherResponse.current.temperature_2m}
          {weatherResponse.current_units.temperature_2m}
        </span>
        <span
          className="text-xs font-extrabold"
          style={{ color: weatherStatusColor.color }}
        >
          {weatherStatusColor.status}
        </span>
      </span>
      <PlusIcon
        onClick={() => removeCity(weatherResponse.name)}
        className="cursor-pointer"
      />
    </li>
  );
}
