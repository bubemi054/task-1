import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { City, WeatherResponse } from "./types";

export const fetchCityWeather = async (
  city: City
): Promise<WeatherResponse> => {
  const baseURL = new URL(import.meta.env.VITE_OPEN_METEO_URL);
  baseURL.searchParams.set("latitude", city.lat.toString());
  baseURL.searchParams.set("longitude", city.lon.toString());
  baseURL.searchParams.set("forecast_days", "7");
  baseURL.searchParams.set("current", "temperature_2m,weathercode");
  baseURL.searchParams.set("hourly", "wind_speed_10m,temperature_2m,relative_humidity_2m,weathercode,precipitation,cloudcover");

  const url = baseURL.toString();
  const response = await axios.get(url);
  return { ...response.data, ...city };
};

export const fetchCitiesWeather = async (
  cities: City[]
): Promise<WeatherResponse[]> => {
  const baseURL = new URL(import.meta.env.VITE_OPEN_METEO_URL);
  const latitudes = cities.map((city) => city.lat)?.join(",");
  const longitudes = cities.map((city) => city.lon)?.join(",");
  baseURL.searchParams.set("latitude", latitudes);
  baseURL.searchParams.set("longitude", longitudes);
  baseURL.searchParams.set("current", "temperature_2m,weathercode");
  baseURL.searchParams.set("hourly", "wind_speed_10m,temperature_2m,relative_humidity_2m,weathercode,precipitation,cloudcover");

  const url = baseURL.toString();
  const response = await axios.get(url);
  return response.data.map((wr: WeatherResponse, index: number) => ({
    ...wr,
    ...cities[index],
  }));
};

export const getCitiesWeather = createAsyncThunk(
  "getCitiesWeather",
  async (args: City[], { rejectWithValue }) => {
    try {
      const weather = await fetchCitiesWeather(args);
      return weather;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
        return rejectWithValue(err.message);
      } else {
        console.log(err);
        return rejectWithValue(err);
      }
    }
  }
);

export const getCityWeather = createAsyncThunk(
  "getCityWeather",
  async (args: City, { rejectWithValue }) => {
    try {
      const weather = await fetchCityWeather(args);
      return weather;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      } else {
        return rejectWithValue(err);
      }
    }
  }
);

export interface CitySliceState {
  // multiple cities
  citiesWeather: WeatherResponse[];
  fetchingCitiesWeather: boolean;
  fetchingCitiesWeatherError: string;
  // single city
  cityWeather?: WeatherResponse;
  fetchingCityWeather: boolean;
  fetchingCityWeatherError: string;
}

const initialState: CitySliceState = {
  citiesWeather: [],
  fetchingCitiesWeather: false,
  fetchingCitiesWeatherError: "",
  cityWeather: undefined,
  fetchingCityWeather: false,
  fetchingCityWeatherError: "",
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCitiesWeather.pending, (state) => {
        state.fetchingCitiesWeather = true;
      })
      .addCase(getCitiesWeather.fulfilled, (state, { payload }) => {
        state.fetchingCitiesWeather = false;
        state.citiesWeather = payload;
        state.fetchingCitiesWeatherError = "";
      })
      .addCase(getCitiesWeather.rejected, (state, { payload }) => {
        state.fetchingCitiesWeather = false;
        if (typeof payload === "string") {
          state.fetchingCitiesWeatherError = payload;
        } else {
          state.fetchingCitiesWeatherError = "Error fetching cities weather";
        }
      });

    builder
      .addCase(getCityWeather.pending, (state) => {
        state.fetchingCityWeather = true;
      })
      .addCase(getCityWeather.fulfilled, (state, { payload }) => {
        state.fetchingCityWeather = false;
        state.cityWeather = payload;
        state.fetchingCityWeatherError = "";
      })
      .addCase(getCityWeather.rejected, (state, { payload }) => {
        state.fetchingCityWeather = false;
        if (typeof payload === "string") {
          state.fetchingCityWeatherError = payload;
        } else {
          state.fetchingCityWeatherError = "Error fetching city weather";
        }
      });
  },
});

export const cityActions = citySlice.actions;

export default citySlice.reducer;
