import reducer, {
  cityActions,
  initialState,
  getCitiesWeather,
  getCityWeather,
  getFavoriteCitiesWeather,
  getRemovedCitiesWeather,
} from "./citySlice";
import type { City, WeatherResponse, Note } from "./types";
import { describe, it, expect, vi } from "vitest";

vi.mock("./cities.json", () => ({
  default: [
    {
      cityId: 3185648,

      name: "Fratar",

      altName: "",

      country: "AL",

      featureCode: "PPLA3",

      adminCode: "44",

      population: 0,

      loc: { type: "Point", coordinates: [40.5, 19.81667] },
    },

    {
      cityId: 3185652,

      name: "Frakulla e Madhe",

      altName: "",

      country: "AL",

      featureCode: "PPLA3",

      adminCode: "44",

      population: 0,

      loc: { type: "Point", coordinates: [40.65583, 19.5025] },
    },
  ],
}));

describe("citySlice reducer", () => {
  console.log("stearting tests");
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should reset to initial state", () => {
    const modifiedState = {
      ...initialState,
      fetchingCitiesWeather: true,
    };
    expect(reducer(modifiedState, cityActions.reset())).toEqual(initialState);
  });

  it("should update recent current city", () => {
    const city: City = {
      cityId: 3185648,

      name: "Fratar",

      altCountry: "",

      country: "AL",

      featureCode: "PPLA3",

      adminCode: "44",

      population: 0,

      loc: { type: "Point", coordinates: [40.5, 19.81667] },
    };

    const newState = reducer(
      initialState,
      cityActions.updateRecentCurrentCity(city),
    );
    expect(newState.recentCurrentCity).toEqual(city);
  });

  it("should update notes", () => {
    const notes: Note[] = [{ id: 1, text: "This is a test note", cityId: 1 }];
    const newState = reducer(initialState, cityActions.updateNotes(notes));
    expect(newState.notes).toEqual(notes);
  });
});

const mockWeatherResponses: WeatherResponse[] = [
  {
    latitude: 23.75,
    longitude: 90.375,
    generationtime_ms: 0.1081228256225586,
    utc_offset_seconds: 0,
    timezone: "GMT",
    timezone_abbreviation: "GMT",
    elevation: 27,
    current_units: {
      time: "iso8601",
      interval: "seconds",
      temperature_2m: "°C",
      weathercode: "wmo code",
      wind_speed_10m: "km/h",
      precipitation: "mm",
      cloudcover: "%",
      relative_humidity_2m: "%",
      surface_pressure: "hPa",
      uv_index: "",
    },
    current: {
      time: "2025-03-29T07:15",
      interval: 900,
      temperature_2m: 36,
      weathercode: 1,
      wind_speed_10m: 10.1,
      precipitation: 0,
      cloudcover: 24,
      relative_humidity_2m: 47,
      surface_pressure: 1002.9,
      uv_index: 8.25,
    },
    hourly_units: {
      time: "iso8601",
      wind_speed_10m: "km/h",
      temperature_2m: "°C",
      relative_humidity_2m: "%",
      weathercode: "wmo code",
      precipitation: "mm",
      cloudcover: "%",
    },
    hourly: {
      time: [
        "2025-03-29T00:00",
        "2025-03-29T01:00",
        "2025-03-29T02:00",
        "2025-03-29T03:00",
        "2025-03-29T04:00",
        "2025-03-29T05:00",
        "2025-03-29T06:00",
        "2025-03-29T07:00",
        "2025-03-29T08:00",
        "2025-03-29T09:00",

        "2025-04-04T23:00",
      ],
      wind_speed_10m: [
        5, 6.5, 8, 8,

        3.9, 3.6, 2.3, 1.5,

        2.9, 3.2, 3.6, 3.3, 3.1,
      ],
      temperature_2m: [
        25.4, 26,

        29, 28.8, 28.5, 27.9, 27.2, 26.6, 26, 25.6,
      ],
      relative_humidity_2m: [
        96,

        53, 55, 57, 59,

        42, 42, 47, 54, 60, 66, 71,
      ],
      weathercode: [
        2, 2, 2, 1,

        2, 2, 2, 2, 2, 2, 2, 2, 2, 1,

        3, 1, 1,
      ],
      precipitation: [
        0,

        0,
      ],
      cloudcover: [
        63, 73, 63, 38,

        61,
      ],
    },
    cityId: 1185241,
    name: "Dhaka",
    altCountry: "",
    country: "BD",
    featureCode: "PPLC",
    adminCode: "81",
    population: 10356500,
    loc: {
      type: "Point",
      coordinates: [23.7104, 90.40744],
    },
    muni: "302640",
    muniSub: "30264072",
  },
];

describe("citySlice async actions", () => {
  it("should handle getCitiesWeather.pending", () => {
    const newState = reducer(initialState, getCitiesWeather.pending("", []));
    expect(newState.fetchingCitiesWeather).toBe(true);
  });

  it("should handle getCitiesWeather.fulfilled", () => {
    const newState = reducer(
      initialState,
      getCitiesWeather.fulfilled(mockWeatherResponses, "", []),
    );
    expect(newState.fetchingCitiesWeather).toBe(false);
    expect(newState.citiesWeather).toEqual(mockWeatherResponses);
  });

  it("should handle getCitiesWeather.rejected", () => {
    const errorMessage = "Network error";
    const newState = reducer(
      initialState,
      getCitiesWeather.rejected(null, "", [], errorMessage),
    );
    expect(newState.fetchingCitiesWeather).toBe(false);
    expect(newState.fetchingCitiesWeatherError).toBe(errorMessage);
  });

  it("should handle getCityWeather.fulfilled", () => {
    const newState = reducer(
      initialState,
      getCityWeather.fulfilled(mockWeatherResponses[0], "", {} as City),
    );
    expect(newState.fetchingCityWeather).toBe(false);
    expect(newState.cityWeather).toEqual(mockWeatherResponses[0]);
  });

  it("should handle getFavoriteCitiesWeather.fulfilled", () => {
    const newState = reducer(
      initialState,
      getFavoriteCitiesWeather.fulfilled(mockWeatherResponses, "", []),
    );
    expect(newState.fetchingFavoriteCities).toBe(false);
    expect(newState.favoriteCities).toEqual(mockWeatherResponses);
  });

  it("should handle getRemovedCitiesWeather.fulfilled", () => {
    const newState = reducer(
      initialState,
      getRemovedCitiesWeather.fulfilled(mockWeatherResponses, "", []),
    );
    expect(newState.fetchingRemovedCities).toBe(false);
    expect(newState.removedCities).toEqual(mockWeatherResponses);
  });
});
