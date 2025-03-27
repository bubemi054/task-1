import React from "react";

const weatherIcons: Record<number, string> = {
  0: "☀️",
  1: "🌤",
  2: "🌤",
  3: "☁️",
  45: "🌫",
  48: "🌫",
  51: "🌧",
  53: "🌧",
  55: "🌧",
  56: "🌧",
  57: "🌧",
  61: "🌧",
  63: "🌧",
  65: "🌧",
  66: "🌧",
  67: "🌧",
  71: "❄️",
  73: "❄️",
  75: "❄️",
  77: "❄️",
  80: "🌦",
  81: "🌦",
  82: "🌦",
  85: "🌨",
  86: "🌨",
  95: "⛈",
  96: "⛈",
  99: "⛈",
};

type ForecastProps = {
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    weathercode: number[];
  };
};

export default function Forecast({ daily }: ForecastProps) {
  if (!daily) {
    return <span>No Data Available</span>;
  }

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

          return (
            <div key={index} className="flex items-center justify-around py-1">
              <span className="text-xl">
                {weatherIcons[daily.weathercode[index]]}
              </span>
              <span className="w-[70px] text-left text-lg">
                {daily.temperature_2m_max[index]}°C
              </span>
              <span className="w-[150px] text-sm">{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
