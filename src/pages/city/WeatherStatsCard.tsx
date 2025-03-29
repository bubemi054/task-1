// @ts-expect-error Need React imported for my tests
import React from "react";
import { isNight, getWeatherDescImageStatus } from "../../utils/weather";

type WeatherCardProps = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  time: string;
  weatherCode: number;
};

export default function WeatherStatsCard({
  time,
  temperature,
  humidity,
  windSpeed,
  pressure,
  uvIndex,
  weatherCode,
}: WeatherCardProps) {
  const isNightTime = isNight(time);
  const { color, description, image } = getWeatherDescImageStatus(
    weatherCode,
    isNightTime,
  );

  return (
    <div className="flex h-[500px] w-[505px] flex-col items-center rounded-[15px] bg-[rgba(0,0,0,0.3)] p-5 text-white backdrop-blur-lg [@media(max-width:1050px)]:w-[375px] [@media(max-width:430px)]:h-auto [@media(max-width:550px)]:w-[100%]">
      <div className="w-full text-left text-[90px] font-bold [@media(max-width:1050px)]:text-[60px] [@media(max-width:550px)]:text-center">
        {temperature}°C
      </div>

      <div className="flex w-full items-center justify-around [@media(max-width:430px)]:flex-col">
        <div className="flex flex-col items-center justify-around gap-[40px] [@media(max-width:550px)]:gap-[20px]">
          <div className="h-[176px] w-[177px] [@media(max-width:1050px)]:w-[130px]">
            <img
              src={image}
              alt="cat"
              className="h-[100%] w-[100%] object-contain"
            />
          </div>
          <div className="text-[30px] font-semibold" style={{ color: color }}>
            {description}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-[40px] gap-y-[20px] text-sm">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[50px]">🌊</span> {/* Increased size */}
            <span className="font-medium">{humidity || "NA"}%</span>
            <span className="font-normal text-white">Humidity</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[50px]">💨</span> {/* Increased size */}
            <span className="font-medium">{windSpeed || "NA"}km/h</span>
            <span className="font-normal text-white">Wind Speed</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[50px]">⏲</span> {/* Increased size */}
            <span className="font-medium">{pressure || "NA"}hPa</span>
            <span className="font-normal text-white">Pressure</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[50px]">🔆</span>
            <span className="font-medium">{uvIndex || "NA"}</span>
            <span className="font-normal text-white">UV</span>
          </div>
        </div>
      </div>
    </div>
  );
}
