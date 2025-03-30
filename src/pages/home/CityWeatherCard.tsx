import { WeatherResponse } from "../../state-manager/types";
import StarIcon from "../../components/icons/StarIcon";
import SendIcon from "../../components/icons/SendIcon";
import TrashIcon from "../../components/icons/TrashIcon";
import { isNight, getWeatherDetails } from "../../utils/weather";
import { twMerge } from "tailwind-merge";

type CityWeatherCardProps = {
  weatherResponse: WeatherResponse;
  toggleFavorite: (city: number) => void;
  toggleRemoved: (city: number) => void;
  viewInDetail: (city: number) => void;
  isFavorite: boolean;
  className?: string;
};

export default function CityWeatherCard({
  weatherResponse,
  toggleFavorite,
  toggleRemoved,
  viewInDetail,
  isFavorite,
  className,
}: CityWeatherCardProps) {
  const isNightTime = isNight(weatherResponse.current.time);

  const { description, image, color } = getWeatherDetails(
    weatherResponse.current.weathercode,
    isNightTime,
  );

  return (
    <div
      className={twMerge(
        "flex h-[450px] flex-col justify-between rounded-[1.25rem] px-[1rem] py-[2rem] sm:h-[380px]",
        `${isNightTime ? "bg-[#1F2937]" : "bg-white opacity-90"}`,
        className,
      )}
    >
      <div className="mb-[1.1rem] flex items-start justify-between">
        <div className="">
          <p
            className={twMerge(
              "font-manrope mb-[3px] text-[10px] leading-[normal] font-medium not-italic",
              `${isNightTime ? "text-[#E3E3E3]" : "text-[#6B7280]"}`,
            )}
          >
            {new Date(weatherResponse.current.time).toDateString()}
          </p>
          <p
            className={twMerge(
              "font-manrope text-xl leading-[normal] font-extrabold not-italic",
              `${isNightTime ? "text-white" : "text-[#111827]"}`,
            )}
          >
            {weatherResponse?.name}
          </p>
        </div>
        <StarIcon
          onClick={() => toggleFavorite(weatherResponse.cityId)}
          fill={isFavorite ? "#F1CC51" : "none"}
          className="cursor-pointer"
        />
      </div>
      <div className="m-auto flex max-h-[200px] max-w-[200px] items-center justify-center">
        <img
          src={image}
          // src={getCatImage(isNightTime, weatherResponse.current.weathercode)}
          role="weather-image"
          className="h-[100%] w-[100%] object-contain"
        />
      </div>
      <div className="relative bottom-2 flex items-center justify-between">
        <p
          className={twMerge(
            "font-manrope bg-gradient-to-b bg-clip-text text-[2.5rem] leading-[normal] font-extrabold text-transparent not-italic",
            `${
              isNightTime
                ? "from-[rgba(255,255,255,0.6)] to-[rgba(0,0,0,0.1)]"
                : "from-[rgba(0,0,0,0.6)] to-[rgba(255,255,255,0.1)]"
            }`,
          )}
        >
          {weatherResponse.current.temperature_2m}
          {weatherResponse.current_units.temperature_2m}
        </p>
        <SendIcon
          stroke={isNightTime ? "#fff" : "#000"}
          onClick={() => viewInDetail(weatherResponse.cityId)}
          className="cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-between">
        <p
          className="font-manrope text-xs leading-[normal] font-extrabold not-italic"
          style={{ color: color }}
        >
          {description}
        </p>
        <TrashIcon
          onClick={() => toggleRemoved(weatherResponse.cityId)}
          stroke={isNightTime ? "#fff" : "#000"}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
