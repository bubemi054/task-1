import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router";
import Spinner from "../../components/general/Spinner";
import useCity from "../../hooks/city/useCity";
import CityTimeDisplay from "./CityTimeDisplay";
import MapComponent from "./MapComponent";
import { useIsOnline } from "react-use-is-online";
import { useNavigate } from "react-router";
import Forecast from "./Forcast";
import WeatherStatsCard from "./WeatherStatsCard";
import PopularCities from "./PopularCities";
import { formatTimeAndDate } from "../../utils/weather";
import Notes from "./Notes";

export default function City() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isCurrentLocationString = searchParams.get("current-location");
  const isCurrentLocation = isCurrentLocationString === "true";
  const { cityId } = useParams<{ cityId: string }>();
  const { remainingBiggestCities, cityWeather, fetchingCityWeather } = useCity(
    cityId,
    isCurrentLocation
  );
  const { isOffline } = useIsOnline();

  useEffect(() => {
    if (isOffline) {
      navigate("/");
    }
  }, [isOffline, navigate]);

  if (fetchingCityWeather) {
    return (
      <div className="h-80 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const { time, dateString } = formatTimeAndDate(
    cityWeather?.current.time || "",
    cityWeather?.latitude || 0,
    cityWeather?.longitude || 0
  );

  return (
    <div className="w-[100%] min-h-[95vh] m-auto mb-[20px] flex flex-col gap-[70px] overflow-x-hidden">
      <div className="flex gap-[15px] flex-wrap">
        <div className="flex flex-col gap-[15px]">
          <div className="flex gap-[15px] [@media(max-width:550px)]:flex-wrap [@media(max-width:1050px)]:justify-center">
            <CityTimeDisplay
              cityName={cityWeather?.name || "Unknown City"}
              time={time || "00:00"}
              dateString={dateString || "Unknown Date"}
            />
            <MapComponent
              latitude={cityWeather?.latitude || 0}
              longitude={cityWeather?.longitude || 0}
            />
          </div>
          <div className="flex gap-[15px] [@media(max-width:840px)]:flex-wrap">
            <Forecast daily={cityWeather?.daily} />
            <WeatherStatsCard
              temperature={cityWeather?.current.temperature_2m || 0}
              humidity={cityWeather?.current.relative_humidity_2m || 0}
              windSpeed={cityWeather?.current.wind_speed_10m || 0}
              pressure={cityWeather?.current.surface_pressure || 0}
              uvIndex={cityWeather?.current.uv_index || 0}
              time={cityWeather?.current.time || ""}
              weatherCode={cityWeather?.current.weathercode || 0}
            />
          </div>
        </div>
        <PopularCities weatherData={remainingBiggestCities} />
      </div>
      {cityWeather && (cityWeather?.cityId || isCurrentLocation) && (
        <Notes cityWeather={cityWeather} isCurrentLocation={isCurrentLocation} />
      )}
    </div>
  );
}
