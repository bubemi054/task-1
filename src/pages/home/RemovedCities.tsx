import React from "react";
import { getWeatherDescImageStatus, isNight } from "../../utils/weather";
import PlusIcon from "../../components/icons/PlusIcon";
import type { WeatherResponse } from "../../state-manager/types";

type RemovedCitiesProps = {
  removedCities: WeatherResponse[];
  toggleRemovedCityId: (city: number) => void;
};

export default function RemovedCities({
  removedCities,
  toggleRemovedCityId,
}: RemovedCitiesProps) {
  return (
    <Dropdown onClick={(e) => e.stopPropagation()}>
      {removedCities?.map((wr) => (
        <Item
          key={wr.cityId}
          weatherResponse={wr}
          removeCity={toggleRemovedCityId}
        />
      ))}
    </Dropdown>
  );
}

type ModalProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
};

function Dropdown({ children, onClick }: ModalProps) {
  return (
    <ul
      onClick={onClick}
      className="absolute top-[50px] z-10 flex max-h-[20rem] w-[22rem] flex-col gap-3 overflow-y-auto rounded-[1.25rem] bg-white px-3 py-2"
    >
      {children}
    </ul>
  );
}

type ItemProps = {
  weatherResponse: WeatherResponse;
  removeCity: (city: number) => void;
};

function Item({ weatherResponse, removeCity }: ItemProps) {
  const isNightTime = isNight(weatherResponse.current.time);

  const { color, description } = getWeatherDescImageStatus(
    weatherResponse.current.weathercode,
    isNightTime,
  );

  return (
    <li className="flex w-full items-center justify-between rounded-[0.625rem] px-[.5rem] py-[0.5rem] shadow-[0px_4px_4px_0px_rgba(29,114,207,0.15)]">
      <span className="flex flex-col">
        <span className="font-manrope text-[10px] leading-[normal] font-bold text-[#6B7280] not-italic">
          {new Date(weatherResponse.current.time)?.toDateString()}
        </span>
        <span className="font-manrope text-[16px] leading-[normal] font-extrabold text-[#111827] not-italic">
          {weatherResponse.name}
        </span>
      </span>

      <span className="flex w-[120px] items-end justify-center gap-1">
        <div className="text-left">
          <span className="font-manrope bg-gradient-to-t from-[#111827] to-[#6B7280] bg-clip-text text-[20px] leading-normal font-extrabold text-transparent not-italic">
            {weatherResponse.current.temperature_2m}
            {weatherResponse.current_units.temperature_2m}
          </span>
        </div>

        <span
          className="font-manrope text-xs leading-[normal] font-extrabold not-italic truncate sm:min-w-[100px]"
          style={{ color: color }}
        >
          {description}
        </span>
      </span>

      <PlusIcon
        onClick={() => removeCity(weatherResponse.cityId)}
        className="cursor-pointer"
      />
    </li>
  );
}
