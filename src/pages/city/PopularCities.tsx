import { Send } from "lucide-react";
import { WeatherResponse } from "../../state-manager/types";
import { getWeatherStatus } from "../../utils/weather";
import { Link } from "react-router";

interface PopularCitiesProps {
  weatherData: WeatherResponse[];
}

export default function PopularCities({ weatherData }: PopularCitiesProps) {
  return (
    <div className="w-[428px] h-[812px] backdrop-blur-[20px] bg-[rgba(0,0,0,0.2)] py-[25px] px-[25px] rounded-[15px]">
      <h2 className="text-white text-2xl font-semibold text-center mb-4">
        Biggest Cities
      </h2>
      <div className="space-y-3 overflow-y-auto h-[700px] scrollbar-hide">
        {weatherData?.map((city) => {
          const day = new Date(city.current.time).toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "short",
          });

          return (
            <div
              key={city.name}
              className="bg-white p-4 rounded-xl flex items-center justify-between shadow-md"
            >
              <div>
                <p className="text-xs text-gray-500">{day}</p>
                <p className="font-bold text-lg">{city.name}</p>
              </div>
              <div className="w-[180px] flex justify-between items-center gap-2">
                <div className="flex gap-[5px]">
                  <span className="bg-clip-text text-[25px] font-bold bg-gradient-to-b text-transparent font-manrope from-[rgba(0,0,0,1)] to-[rgba(255,255,255,0.1)]">
                    {city.current.temperature_2m}{" "}
                    {city.current_units.temperature_2m}
                  </span>
                  <span
                    className="text-[12px] font-semibold relative bottom-[-20px]"
                    style={{
                      color: getWeatherStatus(city.current.weathercode)?.color,
                    }}
                  >
                    {getWeatherStatus(city.current.weathercode)?.status}
                  </span>
                </div>
                <Link to={`/city/${city?.cityId}`}>
                  <Send className="" size={20} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
