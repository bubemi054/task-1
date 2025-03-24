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
    <div className="[@media(max-width:550px)]:w-[100%] w-[376px] h-[500px] backdrop-blur-[20px] bg-[rgba(0,0,0,0.2)] rounded-[15px] p-4 text-white py-[30px] flex flex-col gap-[25px]">
      <div className="flex justify-between items-center mb-2 px-[15px]">
        <h3 className="font-bold text-[36px] [@media(max-width:380px)]:text-[24px]">Forecast</h3>
        <button className=" bg-white text-black px-3 py-1 rounded-md text-sm">
          6 Days
        </button>
      </div>
      <div className="rounded-[15px] h-[100%] flex flex-col justify-between">
        {daily.time.slice(1, 7).map((date, index) => {
          const day = new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "short",
          });

          return (
            <div key={index} className="flex justify-around items-center py-1">
              <span className="text-xl">
                {weatherIcons[daily.weathercode[index]]}
              </span>
              <span className="text-lg w-[70px] text-left">
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
