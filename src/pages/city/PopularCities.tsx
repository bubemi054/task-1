import { Send } from "lucide-react";
import { WeatherResponse } from "../../state-manager/types";
import { getWeatherStatus } from "../../utils/weather";
import { Link } from "react-router";

type PopularCitiesProps = {
  weatherData: WeatherResponse[];
};

export default function PopularCities({ weatherData }: PopularCitiesProps) {
  return (
    <div className="h-[812px] w-[428px] rounded-[15px] bg-[rgba(0,0,0,0.2)] px-[25px] py-[25px] backdrop-blur-[20px] [@media(max-width:550px)]:h-auto [@media(max-width:550px)]:w-[100%]">
      <h2 className="mb-4 text-center text-2xl font-semibold text-white">
        Biggest Cities
      </h2>
      <div className="scrollbar-hide h-[700px] space-y-3 overflow-y-auto [@media(max-width:550px)]:h-auto">
        {weatherData?.length === 0 && (
          <span className="text-center">No Data Available</span>
        )}
        {weatherData?.map((city) => (
          <PopularCity key={city.cityId} city={city} />
        ))}
      </div>
    </div>
  );
}

export function PopularCity({ city }: { city: WeatherResponse }) {
  const day = new Date(city.current.time).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  return (
    <div
      key={city.name}
      className="flex items-center justify-between rounded-xl bg-white p-4 shadow-md [@media(max-width:550px)]:flex-col [@media(max-width:550px)]:gap-[20px]"
    >
      <div>
        <p className="text-xs text-gray-500">{day}</p>
        <p className="text-lg font-bold">{city.name}</p>
      </div>
      <div className="flex w-[180px] items-center justify-between gap-2">
        <div className="flex gap-[5px]">
          <span className="font-manrope bg-gradient-to-b from-[rgba(0,0,0,1)] to-[rgba(255,255,255,0.1)] bg-clip-text text-[25px] font-bold text-transparent">
            {city.current.temperature_2m}
            {city.current_units.temperature_2m}
          </span>
          <span
            className="relative bottom-[-20px] text-[12px] font-semibold"
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
}
