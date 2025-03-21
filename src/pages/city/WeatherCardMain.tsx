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

interface WeatherCardProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  time: string;
  weatherCode: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  time,
  temperature,
  humidity,
  windSpeed,
  pressure,
  uvIndex,
  weatherCode,
}) => {
  const isNightTime = isNight(time);
  const weatherStatusColor = getWeatherStatus(weatherCode);

  return (
    <div className="w-[505px] h-[500px] bg-[rgba(0,0,0,0.3)] rounded-[15px] backdrop-blur-lg p-5 text-white flex flex-col items-center">
      <div className="w-full text-[90px] text-left font-bold">
        {temperature}°C
      </div>

      <div className="w-full flex justify-around items-center">
        <div className="flex flex-col justify-around items-center gap-[40px]">
          <div className="w-[177px] h-[176px]">
            <img
              src={getCatImage(isNightTime, weatherCode)}
              alt="cat"
              className="w-[100%] h-[100%] object-contain"
            />
          </div>
          <div
            className="text-[30px] font-semibold"
            style={{ color: weatherStatusColor?.color }}
          >
            {weatherStatusColor?.status}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-[40px] gap-y-[20px] mt-4 text-sm">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[50px]">🌊</span>
            <span className="font-medium">{humidity || "N/A"}%</span>
            <span className="text-white font-normal">Humidity</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[50px]">💨</span>
            <span className="font-medium">{windSpeed || "N/A"}km/h</span>
            <span className="text-white font-normal">Wind Speed</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[50px]">⏲</span>
            <span className="font-medium">{pressure || "N/A"}hPa</span>
            <span className="text-white font-normal">Pressure</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[50px]">🔆</span>
            <span className="font-medium">{uvIndex || "N/A"}</span>
            <span className="text-white font-normal">UV</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
