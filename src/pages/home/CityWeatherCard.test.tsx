// @ts-expect-error Need React imported for my tests
import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import CityWeatherCard from "./CityWeatherCard";
import { BrowserRouter } from "react-router";
import { describe, vi, it, expect, afterEach } from "vitest";
import type { WeatherResponse } from "../../state-manager/types";
import "@testing-library/jest-dom/vitest";

const mockWeatherResponse: WeatherResponse = {
  latitude: 39.875,
  longitude: 116.375,
  generationtime_ms: 0.10502338409423828,
  utc_offset_seconds: 0,
  timezone: "GMT",
  timezone_abbreviation: "GMT",
  elevation: 47,
  // location_id: 5,
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
    time: "2025-03-28T11:15",
    interval: 900,
    temperature_2m: 4.6,
    weathercode: 0,
    wind_speed_10m: 14.6,
    precipitation: 0,
    cloudcover: 0,
    relative_humidity_2m: 18,
    surface_pressure: 1018.8,
    uv_index: 0,
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
      "2025-03-28T00:00",
      "2025-03-28T01:00",
      "2025-03-28T02:00",
      "2025-03-28T03:00",
      "2025-03-28T04:00",
      "2025-03-28T05:00",
      "2025-03-28T06:00",
      "2025-03-28T07:00",
      "2025-03-28T08:00",
      "2025-03-28T09:00",
      "2025-03-28T10:00",
      "2025-03-28T11:00",
      "2025-03-28T12:00",
      "2025-03-28T13:00",
      "2025-03-28T14:00",
      "2025-03-28T15:00",
      "2025-03-28T16:00",
      "2025-03-28T17:00",
      "2025-03-28T18:00",
      "2025-03-28T19:00",
      "2025-03-28T20:00",
      "2025-03-28T21:00",
      "2025-03-28T22:00",
      "2025-03-28T23:00",
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
    ],
    wind_speed_10m: [
      5.7, 6.7, 5.4, 8.1, 13, 10.4, 13.6, 16.2, 21.2, 20.6, 18.9, 15.3, 11.9,
      10.4, 8.8, 5.9, 3.8, 2.3, 2.5, 3.3, 4.1, 4.6, 4.9, 4.6, 5.4, 6.6, 10.1,
      18.1, 19.2, 19.4, 18.6, 16.8, 16.8, 14.1, 11.9, 7.4, 5.2, 3.6, 4, 4, 3.5,
      3.8, 3.9, 3.7, 3.7, 3.8, 3.7, 4.3, 5.8, 6.9, 9, 10.1, 10.8, 12.9, 14.5,
      14.7, 14.5, 14.4, 13, 11.2, 10.6, 10.7, 10, 7.2, 4.7, 2.6, 0.8, 2.5, 3.1,
      4, 4.6, 3.4, 3.4, 3.6, 3.1, 2.6, 2.7, 3.1, 6.4, 7.2, 8.7, 7.4, 5.5, 4.8,
      5, 4.7, 4.2, 3.7, 3.8, 4.2, 4.8, 4.9, 5.2, 5.7, 5.8, 6.1, 6.5, 7.9, 10,
      12.3, 13.7, 14.7, 15.4, 16.5, 18.7, 19.7, 16.6, 11.6, 7.8, 6.4, 6.6, 6.6,
      6.2, 5.9, 5.6, 5.2, 4.5, 4.2, 3.9, 3.2, 3.2, 4.1, 5.4, 6.1, 5.1, 3.1, 2.7,
      5.8, 8.2, 9.8, 9.3, 7.3, 6.1, 5.8, 6.1, 6.2, 6.1, 6.2, 5.5, 3.4, 0.8, 1.9,
      3, 3.1, 2.4, 1.5, 3.1, 5.4, 7.2, 9.5, 11.1, 11.4, 11, 10.2, 8.7, 7.2, 5.8,
      5.4, 5.1, 4.4, 2.1, 2.3, 4.5, 4.7, 4.2, 3.8, 3.9, 4,
    ],
    temperature_2m: [
      5.3, 6.7, 7.9, 8.5, 8.6, 8.8, 9, 9.6, 9.2, 7.9, 6.4, 4.9, 4, 3.1, 2.4,
      1.7, 1, 0.6, 0.5, 0.4, -0.8, -1.1, -1.3, -1.1, 1.1, 3.6, 5.5, 7.2, 8.4,
      9.7, 10.2, 10.6, 10.7, 10.1, 9.1, 7.5, 6, 5, 4.3, 3.5, 2.9, 2.4, 1.8, 1.3,
      0.8, 0.3, 0, -0.2, 1.9, 4.6, 7, 8.8, 10.3, 11.5, 12.3, 12.5, 12.3, 11.8,
      10.9, 9.5, 8.3, 7.4, 6.9, 6.4, 5.7, 5.3, 5.1, 4.7, 4.2, 3.3, 2.6, 1.9,
      3.6, 6.5, 9.5, 12.2, 14.6, 16.4, 17.8, 18.5, 18.6, 17.9, 16.1, 13.8, 12.6,
      11.4, 10.4, 9.5, 8.7, 8, 7.5, 7.1, 6.9, 7, 7.5, 8.2, 9.4, 11.4, 13.8,
      15.8, 17.2, 18.2, 18.8, 18.9, 18.7, 17.9, 16.4, 14.4, 12.6, 11.2, 10.1,
      9.2, 8.6, 8.1, 7.7, 7.2, 6.8, 6.7, 6.7, 7, 7.9, 9.9, 12.6, 14.7, 16, 16.7,
      17.2, 17.8, 17.7, 17.3, 16.3, 15, 13.7, 12.7, 11.7, 10.8, 10.2, 9.6, 9.2,
      8.8, 8.5, 8.2, 7.7, 7.2, 7.6, 9.5, 12.2, 14.7, 16.6, 18.2, 19.4, 20, 20,
      19.7, 18.7, 17.2, 15.8, 14.8, 13.9, 13, 11.9, 10.7, 9.7, 8.9, 8.2, 7.9,
      7.9, 8.3,
    ],
    relative_humidity_2m: [
      22, 18, 15, 14, 19, 20, 23, 19, 13, 12, 12, 17, 19, 21, 24, 28, 33, 35,
      35, 33, 40, 42, 42, 43, 36, 27, 21, 17, 14, 13, 13, 13, 13, 14, 16, 22,
      30, 35, 37, 39, 42, 44, 45, 46, 48, 50, 53, 58, 53, 40, 34, 30, 25, 24,
      23, 23, 25, 25, 27, 33, 41, 44, 45, 46, 50, 54, 53, 54, 56, 61, 65, 72,
      64, 51, 41, 35, 30, 27, 23, 19, 17, 21, 35, 44, 39, 42, 45, 47, 50, 52,
      53, 52, 50, 48, 47, 45, 42, 36, 29, 23, 19, 16, 15, 15, 17, 19, 22, 26,
      30, 33, 36, 38, 39, 40, 41, 42, 43, 44, 46, 47, 46, 39, 30, 23, 21, 21,
      21, 17, 18, 19, 21, 24, 26, 28, 30, 32, 33, 34, 36, 38, 41, 44, 47, 50,
      50, 45, 38, 31, 27, 24, 22, 21, 21, 22, 25, 28, 32, 35, 38, 42, 47, 52,
      56, 58, 60, 60, 59, 57,
    ],
    weathercode: [
      2, 3, 3, 2, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      1, 3, 1, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 1, 0, 0, 1, 1, 1,
      0, 0, 0, 2, 3, 3, 3, 1, 0, 1, 3, 3, 3, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0,
      3, 3, 3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2,
    ],
    precipitation: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
    cloudcover: [
      64, 100, 100, 64, 100, 100, 100, 100, 88, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 41, 86, 7, 88, 24, 29, 36, 6, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 22, 0, 0, 0, 23, 51, 29, 0, 10,
      52, 28, 0, 21, 18, 0, 0, 42, 33, 34, 0, 0, 0, 61, 100, 100, 100, 24, 0, 6,
      36, 65, 95, 79, 63, 47, 31, 16, 0, 17, 33, 50, 33, 17, 0, 33, 67, 100, 77,
      55, 32, 21, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 5,
      0, 0, 0, 12, 24, 36, 57, 79, 100, 99, 98, 97, 94, 90, 87, 70, 54, 37, 25,
      12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 35, 52, 44, 36, 28, 42, 55, 69, 71,
      73,
    ],
  },
  cityId: 1816670,
  name: "Beijing",
  // altName: "",
  country: "CN",
  coordinates: [39.9075, 116.39723],
};

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("CityWeatherCard Component", () => {
  const mockToggleFavorite = vi.fn();
  const mockToggleRemoved = vi.fn();
  const mockNavigate = vi.fn();

  const renderComponent = (isFavorite = false) => {
    return render(
      <BrowserRouter>
        <CityWeatherCard
          weatherResponse={mockWeatherResponse}
          toggleFavorite={mockToggleFavorite}
          toggleRemoved={mockToggleRemoved}
          viewInDetail={mockNavigate}
          isFavorite={isFavorite}
        />
      </BrowserRouter>,
    );
  };

  it("renders city name and temperature", () => {
    renderComponent();
    expect(screen.getByText("Beijing")).toBeInTheDocument();
    expect(screen.getByText("4.6°C")).toBeInTheDocument();
  });

  it("calls toggleFavorite when star icon is clicked", () => {
    renderComponent();
    const starIcon = screen.getByRole("star-icon");
    fireEvent.click(starIcon);
    expect(mockToggleFavorite).toHaveBeenCalledWith(1816670);
  });

  it("calls toggleRemoved when trash icon is clicked", () => {
    renderComponent();
    const trashIcon = screen.getByRole("trash-icon");
    fireEvent.click(trashIcon);
    expect(mockToggleRemoved).toHaveBeenCalledWith(1816670);
  });

  it("navigates to city details when send icon is clicked", () => {
    renderComponent();
    const sendIcon = screen.getByRole("send-icon");
    fireEvent.click(sendIcon);
    expect(mockNavigate).toHaveBeenCalledWith(1816670);
  });

  it("renders correct weather status", () => {
    renderComponent();
    expect(screen.getByText("Sunny")).toBeInTheDocument();
  });
});
