import { WeatherResponse } from "../../state-manager/types";
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
import StarIcon from "../../components/icons/StarIcon";
import SendIcon from "../../components/icons/SendIcon";
import TrashIcon from "../../components/icons/TrashIcon";
import { isNight, getWeatherStatus } from "../../utils/weather";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

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

type CityWeatherCardProps = {
  weatherResponse: WeatherResponse;
  toggleFavorite: (city: string) => void;
  toggleRemoved: (city: string) => void;
  isFavorite: boolean;
};

export default function CityWeatherCard({
  weatherResponse,
  toggleFavorite,
  toggleRemoved,
  isFavorite,
}: CityWeatherCardProps) {
  const navigate = useNavigate();
  const isNightTime = isNight(weatherResponse.current.time);
  const weatherStatusColor = getWeatherStatus(
    weatherResponse.current.weathercode
  );

  const viewInDetail = () => {
    navigate(`/city/${weatherResponse?.name}`);
  };

  return (
    <div
      className={twMerge(
        "rounded-[1.25rem] px-[1rem] py-[1.5rem]",
        `${isNightTime ? "bg-[#1F2937]" : "bg-white"}`
      )}
    >
      <div className="flex items-start justify-between mb-[1.1rem]">
        <div className="">
          <p
            className={twMerge(
              "text-xs not-italic font-medium leading-[normal] font-manrope",
              `${isNightTime ? "text-[#E3E3E3]" : "text-[#6B7280]"}`
            )}
          >
            {new Date(weatherResponse.current.time).toDateString()}
          </p>
          <p
            className={twMerge(
              "text-xl not-italic font-extrabold leading-[normal] font-manrope",
              `${isNightTime ? "text-white" : "text-[#111827]"}`
            )}
          >
            {weatherResponse?.name}
          </p>
        </div>
        <StarIcon
          onClick={() => toggleFavorite(weatherResponse.name)}
          fill={isFavorite ? "#F1CC51" : "none"}
        />
      </div>
      <div className="flex items-center justify-center w-full h-[8rem]">
        <img
          src={getCatImage(isNightTime, weatherResponse.current.weathercode)}
          alt="cat"
          className=""
        />
      </div>
      <div className="flex items-center justify-between">
        <p
          className={
            "bg-clip-text text-[2.5rem] not-italic font-extrabold leading-[normal] bg-gradient-to-t text-transparent font-manrope from-[#111827] to-[#6B7280]"
          }
        >
          {weatherResponse.current.temperature_2m}
          {weatherResponse.current_units.temperature_2m}
        </p>
        <SendIcon
          stroke={isNightTime ? "#fff" : "#000"}
          onClick={viewInDetail}
        />
      </div>
      <div className="flex justify-between items-center">
        <p
          className="text-xs not-italic font-extrabold leading-[normal] font-manrope"
          style={{ color: weatherStatusColor.color }}
        >
          {weatherStatusColor.status}
        </p>
        <TrashIcon
          onClick={() => toggleRemoved(weatherResponse.name)}
          stroke={isNightTime ? "#fff" : "#000"}
        />
      </div>
    </div>
  );
}
