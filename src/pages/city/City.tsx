import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state-manager/store";
import { getCityWeather } from "../../state-manager/citySlice";
import { useEffect } from "react";
import Spinner from "../../components/general/Spinner";
import CityTimeDisplay from "./CityTimeDisplay";
import MapComponent from "./MapComponent";
import Forecast from "./Forcast";
import WeatherCard from "./WeatherCardMain";
import PopularCities from "./PopularCities";
import { formatTimeAndDate } from "../../utils/weather";
import Notes from "./Notes";

export default function City() {
  const dispatch: AppDispatch = useDispatch();
  const { city } = useParams<{ city: string }>();
  const { citiesWeather, cityWeather, fetchingCityWeather } = useSelector(
    (state: RootState) => state.city
  );

  useEffect(() => {
    const foundCity = citiesWeather.find((c) => c.name === city);
    if (foundCity) {
      dispatch(getCityWeather(foundCity));
    }
  }, [city, dispatch, citiesWeather]);

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
    <div className="w-[100%] min-h-[95vh] m-auto mb-[20px] flex flex-col gap-[70px]">
      <div className="flex gap-[15px]">
        <div className="flex flex-col gap-[15px]">
          <div className="flex gap-[15px]">
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
          <div className="flex gap-[15px]">
            <Forecast daily={cityWeather?.daily} />
            <WeatherCard
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
        <PopularCities weatherData={citiesWeather.slice(0, 8)} />
      </div>
      {cityWeather?.cityId && <Notes cityWeather={cityWeather} />}
    </div>
  );
}
