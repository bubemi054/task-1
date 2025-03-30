// @ts-expect-error Need React imported for my tests
import React from "react";
import { getWeatherDetails } from "../../utils/weather";

type ForecastProps = {
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    weathercode: number[];
  };
  dailyUnits?: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    weathercode: string;
  };
};

export default function Forecast({ daily, dailyUnits }: ForecastProps) {
  if (!daily) {
    return <span>No Data Available</span>;
  }

  // time doesn't matter for forecast UI
  return (
    <div className="flex h-[500px] w-[376px] flex-col gap-[25px] rounded-[15px] bg-[rgba(0,0,0,0.2)] p-4 py-[30px] text-white backdrop-blur-[20px] [@media(max-width:550px)]:w-[100%]">
      <div className="mb-2 flex items-center justify-between px-[15px]">
        <h3 className="text-[36px] font-bold [@media(max-width:380px)]:text-[24px]">
          Forecast
        </h3>
        <button className="rounded-md bg-white px-3 py-1 text-sm text-black">
          6 Days
        </button>
      </div>
      <div className="flex h-[100%] flex-col justify-between rounded-[15px]">
        {daily.time.slice(1, 7).map((date, index) => {
          const day = new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "short",
          });

          // isNight can be true or falsehere dont matter
          const { emoji } = getWeatherDetails(daily.weathercode[index], true);

          return (
            <div key={index} className="flex items-center justify-around py-1">
              <span className="text-xl">{emoji}</span>
              <span
                data-testid="max-temp"
                className="w-[70px] text-left text-lg"
              >
                {daily.temperature_2m_max[index]}
                {dailyUnits?.temperature_2m_max}
              </span>
              <span className="w-[150px] text-sm">{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
