import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import PopularCities, { PopularCity } from "./PopularCities";
import { describe, vi, it, expect, afterEach } from "vitest";
import * as weatherUtils from "../../utils/weather";
import type { WeatherResponse } from "../../state-manager/types";
import "@testing-library/jest-dom/vitest";

vi.mock("../../utils/weather", () => ({
  getWeatherDetails: vi.fn(),
  isNight: vi.fn(),
}));

vi.mock("react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => (
    <a href="#">{children}</a>
  ),
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("PopularCities", () => {
  const mockWeatherData: WeatherResponse = {
    latitude: 31.25,
    longitude: 121.5,
    generationtime_ms: 0.15819072723388672,
    utc_offset_seconds: 0,
    timezone: "GMT",
    timezone_abbreviation: "GMT",
    elevation: 7,
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
      time: "2025-03-29T09:00",
      interval: 900,
      temperature_2m: 10.6,
      weathercode: 3,
      wind_speed_10m: 7.3,
      precipitation: 0,
      cloudcover: 99,
      relative_humidity_2m: 52,
      surface_pressure: 1025.5,
      uv_index: 0.85,
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
        "2025-03-29T10:00",
        "2025-03-29T11:00",
        "2025-03-29T12:00",
        "2025-03-29T13:00",
        "2025-03-29T14:00",
        "2025-03-29T15:00",
        "2025-03-29T16:00",
        "2025-03-29T17:00",
        "2025-03-29T18:00",
        "2025-03-29T19:00",
        "2025-03-29T20:00",
        "2025-03-29T21:00",
        "2025-03-29T22:00",
        "2025-03-29T23:00",
        "2025-03-30T00:00",
        "2025-03-30T01:00",
        "2025-03-30T02:00",
        "2025-03-30T03:00",
        "2025-03-30T04:00",
        "2025-03-30T05:00",
        "2025-03-30T06:00",
        "2025-03-30T07:00",
        "2025-03-30T08:00",
        "2025-03-30T09:00",
        "2025-03-30T10:00",
        "2025-03-30T11:00",
        "2025-03-30T12:00",
        "2025-03-30T13:00",
        "2025-03-30T14:00",
        "2025-03-30T15:00",
        "2025-03-30T16:00",
        "2025-03-30T17:00",
        "2025-03-30T18:00",
        "2025-03-30T19:00",
        "2025-03-30T20:00",
        "2025-03-30T21:00",
        "2025-03-30T22:00",
        "2025-03-30T23:00",
        "2025-03-31T00:00",
        "2025-03-31T01:00",
        "2025-03-31T02:00",
        "2025-03-31T03:00",
        "2025-03-31T04:00",
        "2025-03-31T05:00",
        "2025-03-31T06:00",
        "2025-03-31T07:00",
        "2025-03-31T08:00",
        "2025-03-31T09:00",
        "2025-03-31T10:00",
        "2025-03-31T11:00",
        "2025-03-31T12:00",
        "2025-03-31T13:00",
        "2025-03-31T14:00",
        "2025-03-31T15:00",
        "2025-03-31T16:00",
        "2025-03-31T17:00",
        "2025-03-31T18:00",
        "2025-03-31T19:00",
        "2025-03-31T20:00",
        "2025-03-31T21:00",
        "2025-03-31T22:00",
        "2025-03-31T23:00",
        "2025-04-01T00:00",
        "2025-04-01T01:00",
        "2025-04-01T02:00",
        "2025-04-01T03:00",
        "2025-04-01T04:00",
        "2025-04-01T05:00",
        "2025-04-01T06:00",
        "2025-04-01T07:00",
        "2025-04-01T08:00",
        "2025-04-01T09:00",
        "2025-04-01T10:00",
        "2025-04-01T11:00",
        "2025-04-01T12:00",
        "2025-04-01T13:00",
        "2025-04-01T14:00",
        "2025-04-01T15:00",
        "2025-04-01T16:00",
        "2025-04-01T17:00",
        "2025-04-01T18:00",
        "2025-04-01T19:00",
        "2025-04-01T20:00",
        "2025-04-01T21:00",
        "2025-04-01T22:00",
        "2025-04-01T23:00",
        "2025-04-02T00:00",
        "2025-04-02T01:00",
        "2025-04-02T02:00",
        "2025-04-02T03:00",
        "2025-04-02T04:00",
        "2025-04-02T05:00",
        "2025-04-02T06:00",
        "2025-04-02T07:00",
        "2025-04-02T08:00",
        "2025-04-02T09:00",
        "2025-04-02T10:00",
        "2025-04-02T11:00",
        "2025-04-02T12:00",
        "2025-04-02T13:00",
        "2025-04-02T14:00",
        "2025-04-02T15:00",
        "2025-04-02T16:00",
        "2025-04-02T17:00",
        "2025-04-02T18:00",
        "2025-04-02T19:00",
        "2025-04-02T20:00",
        "2025-04-02T21:00",
        "2025-04-02T22:00",
        "2025-04-02T23:00",
        "2025-04-03T00:00",
        "2025-04-03T01:00",
        "2025-04-03T02:00",
        "2025-04-03T03:00",
        "2025-04-03T04:00",
        "2025-04-03T05:00",
        "2025-04-03T06:00",
        "2025-04-03T07:00",
        "2025-04-03T08:00",
        "2025-04-03T09:00",
        "2025-04-03T10:00",
        "2025-04-03T11:00",
        "2025-04-03T12:00",
        "2025-04-03T13:00",
        "2025-04-03T14:00",
        "2025-04-03T15:00",
        "2025-04-03T16:00",
        "2025-04-03T17:00",
        "2025-04-03T18:00",
        "2025-04-03T19:00",
        "2025-04-03T20:00",
        "2025-04-03T21:00",
        "2025-04-03T22:00",
        "2025-04-03T23:00",
        "2025-04-04T00:00",
        "2025-04-04T01:00",
        "2025-04-04T02:00",
        "2025-04-04T03:00",
        "2025-04-04T04:00",
        "2025-04-04T05:00",
        "2025-04-04T06:00",
        "2025-04-04T07:00",
        "2025-04-04T08:00",
        "2025-04-04T09:00",
        "2025-04-04T10:00",
        "2025-04-04T11:00",
        "2025-04-04T12:00",
        "2025-04-04T13:00",
        "2025-04-04T14:00",
        "2025-04-04T15:00",
        "2025-04-04T16:00",
        "2025-04-04T17:00",
        "2025-04-04T18:00",
        "2025-04-04T19:00",
        "2025-04-04T20:00",
        "2025-04-04T21:00",
        "2025-04-04T22:00",
        "2025-04-04T23:00",
      ],
      wind_speed_10m: [
        8.5, 9.7, 9.2, 8.5, 8.2, 7.7, 6.8, 7.2, 7.3, 7.3, 6.9, 6.4, 8, 6.9, 5.2,
        5.3, 4.5, 4.1, 4.5, 4, 3.9, 3.3, 1.8, 2.6, 3.1, 4.7, 7, 5.9, 6, 7.2,
        6.9, 7.2, 7.9, 8.6, 8.4, 6.6, 5.6, 4.6, 3.9, 3.5, 3.5, 3.2, 2.6, 3.1,
        2.6, 2.5, 2.2, 3.2, 2.5, 4.8, 7.8, 8.4, 8.2, 9.6, 9.6, 10.4, 10.9, 10.1,
        7.2, 5.2, 4.4, 3.9, 3.9, 3.6, 3.3, 3.4, 3.5, 3.5, 1.6, 3.2, 3.1, 3.1,
        3.9, 6.9, 6.9, 7, 7.8, 7.3, 8.2, 9.2, 10.5, 10.8, 10.1, 8.7, 7.7, 6.4,
        5.1, 4.1, 3.9, 4, 3.9, 3.8, 3.7, 3.3, 2.9, 2.7, 2.8, 2.9, 3.3, 3.6, 4.2,
        4.9, 5.1, 4.3, 3.1, 1.5, 2.5, 6, 8.2, 7.9, 6.3, 5.2, 4.4, 4.1, 4.1, 4.4,
        4.9, 5.5, 6.3, 7, 7.6, 8, 8, 8.4, 9.1, 9.4, 10.1, 10.5, 11.3, 11, 9.6,
        7.8, 6.3, 5.7, 6, 5.8, 5.7, 5.4, 5.4, 5.4, 5.5, 5.8, 6.3, 6.7, 7.4, 7.9,
        8.4, 9.2, 10.2, 11, 11.8, 12, 11.8, 11.7, 11.2, 10.8, 10.3, 10.5, 11,
        10.9, 9.9, 9, 8, 8, 7.9, 8.1, 9.2, 10.7,
      ],
      temperature_2m: [
        8.1, 8.9, 9.3, 9.7, 10.1, 10.4, 10.6, 10.9, 10.8, 10.6, 9.9, 9.3, 8.7,
        8.4, 8.2, 7.9, 7.7, 7.6, 7.3, 6.9, 6.7, 6.5, 6.6, 7.3, 8.5, 9.9, 10.8,
        11.1, 11.9, 12.4, 12.7, 12.8, 12, 11.1, 10.2, 9.2, 8.5, 7.9, 7.7, 7.2,
        6.7, 6.2, 5.9, 5.9, 5.8, 5.8, 5.8, 6.4, 8.1, 10.2, 11.6, 12.8, 13.8,
        14.2, 14.1, 13.7, 12.9, 11.8, 10.8, 9.8, 9.1, 8.4, 8, 7.6, 7.4, 7.2,
        6.8, 6.7, 6.7, 6.7, 6.8, 7.5, 9.6, 11.9, 13.1, 14.4, 15.4, 16, 16.3,
        15.9, 15, 14, 12.9, 11.5, 10.4, 9.9, 9.5, 9.1, 8.6, 7.9, 7.5, 7.1, 6.8,
        6.9, 7.4, 8.4, 9.8, 11.9, 14.4, 16.4, 17.7, 18.5, 19, 19.4, 19.2, 18.6,
        17.1, 14.9, 13.2, 12.2, 11.7, 11.3, 11, 10.8, 10.7, 10.6, 10.5, 10.6,
        10.9, 11.6, 12.4, 13.6, 15.2, 16.4, 17.1, 17.6, 17.5, 16.9, 15.8, 14.6,
        13.3, 11.9, 10.9, 10.2, 9.9, 9.6, 9.2, 9, 8.9, 8.9, 8.9, 9.3, 9.9, 10.9,
        11.9, 13.1, 14.4, 15.5, 16.5, 17.2, 17.5, 17.2, 16.5, 15.5, 14.4, 13.1,
        12.1, 11.9, 12, 12.1, 12.2, 12.4, 12.6, 12.6, 12.8, 13.1, 13.6, 14.4,
      ],
      relative_humidity_2m: [
        74, 66, 64, 63, 64, 59, 57, 52, 52, 52, 56, 62, 68, 66, 61, 62, 63, 64,
        65, 67, 68, 69, 69, 64, 63, 52, 48, 48, 45, 42, 39, 38, 41, 46, 49, 57,
        64, 67, 69, 71, 72, 73, 73, 72, 71, 69, 69, 67, 62, 55, 49, 45, 39, 35,
        34, 35, 37, 42, 50, 60, 67, 73, 76, 78, 79, 80, 82, 83, 83, 83, 82, 79,
        71, 59, 55, 50, 47, 46, 46, 47, 50, 54, 59, 65, 71, 76, 80, 84, 87, 90,
        92, 93, 93, 92, 90, 87, 82, 73, 61, 52, 47, 44, 43, 43, 45, 49, 56, 66,
        73, 77, 79, 81, 82, 83, 83, 84, 85, 85, 82, 78, 73, 67, 60, 54, 50, 47,
        46, 46, 46, 50, 58, 69, 78, 83, 87, 89, 91, 92, 92, 92, 92, 91, 87, 82,
        77, 71, 65, 60, 58, 57, 57, 59, 61, 65, 70, 75, 79, 80, 80, 80, 81, 83,
        85, 87, 88, 88, 86, 82,
      ],
      weathercode: [
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3,
        3, 3, 3, 3, 3, 3, 3, 2, 3, 2, 2, 2, 3, 2, 3, 2, 1, 1, 1, 1, 3, 3, 3, 3,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 3, 3,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
        3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3,
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1,
      ],
      precipitation: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.1,
        0.1,
      ],
      cloudcover: [
        100, 100, 100, 100, 100, 100, 100, 100, 97, 99, 100, 100, 100, 100, 100,
        100, 100, 100, 79, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 81, 100, 78, 81, 74, 83, 79, 84, 61, 40, 30, 15, 9, 100, 100,
        100, 100, 100, 100, 100, 100, 96, 100, 86, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 44, 56, 70, 64, 58, 52, 68, 84, 100, 99, 97, 96, 94, 92, 90, 63,
        35, 8, 39, 69, 100, 100, 100, 100, 100, 100, 100, 97, 93, 90, 93, 97,
        100, 100, 100, 100, 99, 98, 97, 97, 98, 98, 96, 95, 93, 69, 46, 22, 22,
        22, 22, 18, 14, 10, 7, 3, 0, 1, 3, 4, 12, 21, 29, 53, 76, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 97, 94, 91, 67, 44,
      ],
    },
    cityId: 1796236,
    name: "Shanghai",
    country: "CN",
    coordinates: [31.22222, 121.45806],
  };

  it("renders 'No Data Available' when no cities data is provided", () => {
    render(<PopularCities weatherData={[]} />);
    expect(screen.getByText("No Data Available")).toBeInTheDocument();
  });

  it("renders city names and temperatures", () => {
    vi.spyOn(weatherUtils, "getWeatherDetails").mockReturnValue({
      description: "Cloudy",
      color: "#808080",
      image: "http://openweathermap.org/img/wn/03d@4x.png",
      emoji: "☁️",
    });
    render(<PopularCity city={mockWeatherData} />);
    expect(screen.getByText("Shanghai")).toBeInTheDocument();
    expect(screen.getByText("10.6°C")).toBeInTheDocument();
  });

  it("applies correct weather status and color", () => {
    vi.spyOn(weatherUtils, "getWeatherDetails").mockReturnValue({
      description: "Cloudy",
      color: "#808080",
      image: "http://openweathermap.org/img/wn/03d@4x.png",
      emoji: "☁️",
    });

    render(<PopularCity city={mockWeatherData} />);

    const statusElement = screen.getByText("Cloudy");
    expect(statusElement).toHaveStyle("color: #808080");
  });
});
