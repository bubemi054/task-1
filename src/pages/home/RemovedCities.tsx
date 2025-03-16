import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state-manager/store";
import useRemovedCities from "../../hooks/city/useRemovedCities";
import { uiActions } from "../../state-manager/uiSlice";
import { getWeatherStatus } from "../../utils/weather";
import PlusIcon from "../../components/icons/PlusIcon";
import type { WeatherResponse } from "../../state-manager/types";

export default function RemovedCities() {
  const dispatch = useDispatch();
  const { citiesWeather } = useSelector((state: RootState) => state.city);
  const { toggleRemoved, removedCities } = useRemovedCities();

  const displayedCitiesWeather = useMemo(() => {
    return citiesWeather?.filter((city) => removedCities.includes(city.name));
  }, [citiesWeather, removedCities]);

  useEffect(() => {
    if (displayedCitiesWeather?.length === 0)
      dispatch(uiActions.toggleShowRemovedCities());
  }, [displayedCitiesWeather?.length, dispatch]);

  return (
    <>
      <div
        onClick={() => dispatch(uiActions.toggleShowRemovedCities())}
        className="fixed bottom-0 right-0 w-screen h-screen z-40 bg-[rgba(0,0,0,0.50)]"
      ></div>
      <Modal>
        {displayedCitiesWeather?.map((wr) => (
          <Item key={wr.name} weatherResponse={wr} removeCity={toggleRemoved} />
        ))}
      </Modal>
    </>
  );
}

type ModalProps = {
  children: React.ReactNode;
};

function Modal({ children }: ModalProps) {
  return (
    <ul className="fixed top-1/2 left-1/2 -translate-x-1/2 z-50 -translate-y-1/2 flex w-[26rem] bg-white flex-col gap-3 px-3 py-2 rounded-[1.25rem]">
      {children}
    </ul>
  );
}

type ItemProps = {
  weatherResponse: WeatherResponse;
  removeCity: (city: string) => void;
};

function Item({ weatherResponse, removeCity }: ItemProps) {
  const weatherStatusColor = getWeatherStatus(
    weatherResponse.current.weathercode
  );

  return (
    <li className="w-full shadow-[0px_4px_4px_0px_rgba(29,114,207,0.15)] rounded-[0.625rem] px-[1rem] py-[0.5rem] flex items-center justify-between">
      <span className="flex flex-col">
        <span className="text-[#6B7280] text-xs not-italic font-medium leading-[normal] font-manrope">
          {new Date(weatherResponse.current.time)?.toDateString()}
        </span>
        <span className="text-[#111827] text-xl not-italic font-extrabold leading-[normal] font-manrope">
          {weatherResponse.name}
        </span>
      </span>
      <span className="flex items-end">
        <span
          className={
            "bg-clip-text text-3xl not-italic font-extrabold leading-[normal] bg-gradient-to-t text-transparent font-manrope from-[#111827] to-[#6B7280]"
          }
        >
          {weatherResponse.current.temperature_2m}
          {weatherResponse.current_units.temperature_2m}
        </span>
        <span
          className="text-xs not-italic font-extrabold leading-[normal] font-manrope"
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
