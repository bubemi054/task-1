import React, { useEffect } from "react";
import { useParams } from "react-router";
import Spinner from "../../components/general/Spinner";
import useCity from "../../hooks/city/useCity";
import CityTimeDisplay from "./CityTimeDisplay";
import MapComponent from "./MapComponent";
import { useIsOnline } from "react-use-is-online";
import { useNavigate } from "react-router";
import Forecast from "./Forecast";
import WeatherStatsCard from "./WeatherStatsCard";
import PopularCities from "./PopularCities";
import { formatTimeAndDate } from "../../utils/weather";
import Notes from "./Notes";

export default function City() {
  const navigate = useNavigate();
  const { cityId } = useParams<{ cityId: string }>();
  const { remainingBiggestCities, cityWeather, fetchingCityWeather } = useCity(
    cityId,
  );
  const { isOffline } = useIsOnline();

  useEffect(() => {
    if (isOffline) {
      navigate("/");
    }
  }, [isOffline, navigate]);

  if (fetchingCityWeather) {
    return (
      <div className="flex h-80 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const { time, dateString } = formatTimeAndDate(
    cityWeather?.current.time || "",
    cityWeather?.latitude || 0,
    cityWeather?.longitude || 0,
  );

  console.log(remainingBiggestCities);

  return (
    <div className="m-auto mb-[20px] flex min-h-[95vh] w-[100%] flex-col gap-[70px] overflow-x-hidden">
      <div className="flex flex-wrap gap-[15px]">
        <div className="flex flex-col gap-[15px]">
          <div className="flex gap-[15px] [@media(max-width:1050px)]:justify-center [@media(max-width:550px)]:flex-wrap">
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
            <Forecast daily={cityWeather?.daily} dailyUnits={cityWeather?.daily_units}/>
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
      {cityWeather && (cityWeather?.cityId) && (
        <Notes
          cityWeather={cityWeather}
        />
      )}
    </div>
  );
}
