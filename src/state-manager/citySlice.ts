import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import cities from "./cities.json";
import type { City, WeatherResponse, Note } from "./types";

export const fetchCityWeather = async (
  city: City,
): Promise<WeatherResponse> => {
  const baseURL = new URL(import.meta.env.VITE_OPEN_METEO_URL);
  const [latitude, longitude] = city.coordinates;

  baseURL.searchParams.set("latitude", latitude.toString());
  baseURL.searchParams.set("longitude", longitude.toString());
  baseURL.searchParams.set("timezone", "auto");

  // Fetch Current Weather
  baseURL.searchParams.set(
    "current",
    "temperature_2m,weathercode,wind_speed_10m,precipitation,cloudcover,relative_humidity_2m,surface_pressure,uv_index",
  );

  // Fetch 7-Day Forecast
  baseURL.searchParams.set("forecast_days", "7");
  baseURL.searchParams.set(
    "daily",
    "temperature_2m_max,temperature_2m_min,weathercode",
  );

  baseURL.searchParams.set(
    "hourly",
    "wind_speed_10m,temperature_2m,relative_humidity_2m,weathercode,precipitation,cloudcover",
  );
  // baseURL.searchParams.set("forecast_days", "1")

  const url = baseURL.toString();
  const response = await axios.get(url);

  return { ...response.data, ...city };
};

export const fetchCitiesWeather = async (
  cities: City[],
): Promise<WeatherResponse[]> => {
  const baseURL = new URL(import.meta.env.VITE_OPEN_METEO_URL);
  const latitudes = cities.map((city) => city.coordinates[0])?.join(",");
  const longitudes = cities.map((city) => city.coordinates[1])?.join(",");
  baseURL.searchParams.set("latitude", latitudes);
  baseURL.searchParams.set("longitude", longitudes);
  baseURL.searchParams.set(
    "current",
    "temperature_2m,weathercode,wind_speed_10m,precipitation,cloudcover,relative_humidity_2m,surface_pressure,uv_index",
  );
  baseURL.searchParams.set(
    "hourly",
    "wind_speed_10m,temperature_2m,relative_humidity_2m,weathercode,precipitation,cloudcover",
  );
  // baseURL.searchParams.set("forecast_days", "1")

  const url = baseURL.toString();
  const response = await axios.get(url);

  if (Array.isArray(response.data)) {
    return response.data.map((wr: WeatherResponse, index: number) => ({
      ...wr,
      ...cities[index],
    }));
  }

  return [
    {
      ...response.data,
      ...cities[0],
    },
  ];
};

export const getCitiesWeather = createAsyncThunk(
  "getCitiesWeather",
  async (args: City[], { rejectWithValue }) => {
    try {
      if (args.length === 0) return [];

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
  },
);

export const getFavoriteCitiesWeather = createAsyncThunk(
  "getFavoriteCitiesWeather",
  async (args: City[], { rejectWithValue }) => {
    try {
      if (args.length === 0) return [];

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
  },
);

export const getRemovedCitiesWeather = createAsyncThunk(
  "getRemovedCitiesWeather",
  async (args: City[], { rejectWithValue }) => {
    try {
      if (args.length === 0) return [];

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
  },
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
  },
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
  // favorites cities
  favoriteCities: WeatherResponse[];
  fetchingFavoriteCities: boolean;
  fetchingFavoriteCitiesError: string;
  // removed cities
  removedCities: WeatherResponse[];
  fetchingRemovedCities: boolean;
  fetchingRemovedCitiesError: string;
  // recent city
  recentCurrentCity: City | undefined;
  notes: Note[];
}

export const initialState: CitySliceState = {
  citiesWeather: [],
  fetchingCitiesWeather: false,
  fetchingCitiesWeatherError: "",
  favoriteCities: [],
  fetchingFavoriteCities: false,
  fetchingFavoriteCitiesError: "",
  cityWeather: undefined,
  fetchingCityWeather: false,
  fetchingCityWeatherError: "",
  removedCities: [],
  fetchingRemovedCities: false,
  fetchingRemovedCitiesError: "",
  recentCurrentCity: undefined,
  notes: [],
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    updateRecentCurrentCity: (state, action: PayloadAction<City>) => {
      state.recentCurrentCity = action.payload;
    },
    updateNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
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
      .addCase(getFavoriteCitiesWeather.pending, (state) => {
        state.fetchingFavoriteCities = true;
      })
      .addCase(getFavoriteCitiesWeather.fulfilled, (state, { payload }) => {
        state.fetchingFavoriteCities = false;
        state.favoriteCities = payload;
        state.fetchingFavoriteCitiesError = "";
      })
      .addCase(getFavoriteCitiesWeather.rejected, (state, { payload }) => {
        state.fetchingFavoriteCities = false;
        if (typeof payload === "string") {
          state.fetchingFavoriteCitiesError = payload;
        } else {
          state.fetchingFavoriteCitiesError =
            "Error fetching favorite cities weather";
        }
      });

    builder
      .addCase(getRemovedCitiesWeather.pending, (state) => {
        state.fetchingRemovedCities = true;
      })
      .addCase(getRemovedCitiesWeather.fulfilled, (state, { payload }) => {
        state.fetchingRemovedCities = false;
        state.removedCities = payload;
        state.fetchingRemovedCitiesError = "";
      })
      .addCase(getRemovedCitiesWeather.rejected, (state, { payload }) => {
        state.fetchingRemovedCities = false;
        if (typeof payload === "string") {
          state.fetchingRemovedCitiesError = payload;
        } else {
          state.fetchingRemovedCitiesError =
            "Error fetching favorite cities weather";
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

export const CITIES = (cities as unknown as City[])

// export const BIGGEST_CITIES = CITIES.slice().sort(
//   (a, b) => b.population - a.population,
// );

export default citySlice.reducer;
