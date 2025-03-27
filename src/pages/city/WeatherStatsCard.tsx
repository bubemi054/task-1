import React from "react";
import cat1 from "../../assets/wmo-code-images/wmo10-29.png";
import cat2 from "../../assets/wmo-code-images/wmo30-59.png";
import cat3 from "../../assets/wmo-code-images/wmo60-69.png";
import cat4 from "../../assets/wmo-code-images/wmo70-79.png";
import cat5 from "../../assets/wmo-code-images/wmo80-89.png";
import cat6 from "../../assets/wmo-code-images/wmo90-99.png";
import cat1night from "../../assets/wmo-code-images/dark-icon-1.png";
import cat2night from "../../assets/wmo-code-images/dark-icon-2.png";
import cat3night from "../../assets/wmo-code-images/dark-icon-3.png";
import cat4night from "../../assets/wmo-code-images/dark-icon-4.png";
import cat5night from "../../assets/wmo-code-images/dark-icon-5.png";
import cat6night from "../../assets/wmo-code-images/dark-icon-6.png";
import { isNight, getWeatherStatus } from "../../utils/weather";

function getCatImage(isNight: boolean, wmoCode: number) {
  if (isNight) {
    if (wmoCode >= 0 && wmoCode <= 29) return cat1night;
    if (wmoCode >= 30 && wmoCode <= 59) return cat2night;
    if (wmoCode >= 60 && wmoCode <= 69) return cat3night;
    if (wmoCode >= 70 && wmoCode <= 79) return cat4night;
    if (wmoCode >= 80 && wmoCode <= 89) return cat5night;
    if (wmoCode >= 90 && wmoCode <= 99) return cat6night;
    return "";
  } else {
    if (wmoCode >= 0 && wmoCode <= 29) return cat1;
    if (wmoCode >= 30 && wmoCode <= 59) return cat2;
    if (wmoCode >= 60 && wmoCode <= 69) return cat3;
    if (wmoCode >= 70 && wmoCode <= 79) return cat4;
    if (wmoCode >= 80 && wmoCode <= 89) return cat5;
    if (wmoCode >= 90 && wmoCode <= 99) return cat6;
    return "";
  }
}

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
  const weatherStatusColor = getWeatherStatus(weatherCode);

  return (
    <div className="flex h-[500px] w-[505px] flex-col items-center rounded-[15px] bg-[rgba(0,0,0,0.3)] p-5 text-white backdrop-blur-lg [@media(max-width:1050px)]:w-[375px] [@media(max-width:430px)]:h-auto [@media(max-width:550px)]:w-[100%]">
      <div className="w-full text-left text-[90px] font-bold [@media(max-width:1050px)]:text-[60px] [@media(max-width:550px)]:text-center">
        {temperature}°C
      </div>

      <div className="flex w-full items-center justify-around [@media(max-width:430px)]:flex-col">
        <div className="flex flex-col items-center justify-around gap-[40px] [@media(max-width:550px)]:gap-[20px]">
          <div className="h-[176px] w-[177px] [@media(max-width:1050px)]:w-[130px]">
            <img
              src={getCatImage(isNightTime, weatherCode)}
              alt="cat"
              className="h-[100%] w-[100%] object-contain"
            />
          </div>
          <div
            className="text-[30px] font-semibold"
            style={{ color: weatherStatusColor?.color }}
          >
            {weatherStatusColor?.status}
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
