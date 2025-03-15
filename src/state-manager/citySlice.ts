import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface City {
  name: string;
  country: string;
  address: string;
  area_km2: number;
  lat: number;
  lon: number;
}

export interface WeatherResponse extends City {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string; // "iso8601"
    interval: string; // "seconds"
    temperature_2m: string; // "°C"
    weathercode: string; // "wmo code"
  };
  current: {
    time: string; // ISO 8601 timestamp
    interval: number; // Interval in seconds
    temperature_2m: number; // Temperature in °C
    weathercode: number; // WMO weather code
  };
}

export const fetchCityWeather = async (
  city: City
): Promise<WeatherResponse> => {
  const baseURL = new URL(import.meta.env.VITE_OPEN_METEO_URL);
  baseURL.searchParams.set("latitude", city.lat.toString());
  baseURL.searchParams.set("longitude", city.lon.toString());
  baseURL.searchParams.set("current", "temperature_2m,weathercode");

  const url = baseURL.toString();
  console.log(url);
  const response = await axios.get(url);
  console.log(response);
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

  const url = baseURL.toString();
  console.log(url);
  const response = await axios.get(url);
  console.log(response);
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
