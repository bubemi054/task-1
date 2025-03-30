// @ts-expect-error Need React imported for my tests
import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import WeatherStatsCard from "./WeatherStatsCard";
import { describe, vi, it, expect, afterEach, beforeEach } from "vitest";
import * as weatherUtils from "../../utils/weather";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// Mock weather utility functions
vi.mock("../../utils/weather", () => ({
  isNight: vi.fn(),
  getWeatherDetails: vi.fn(),
}));

describe("WeatherStatsCard", () => {
  const mockProps = {
    time: "2025-03-29T16:30",
    temperature: 12.1,
    weatherCode: 3,
    windSpeed: 15.9,
    humidity: 74,
    pressure: 1017.8,
    uvIndex: 0.45,
  };

  beforeEach(() => {
    vi.mocked(weatherUtils.isNight).mockReturnValue(false);
    vi.mocked(weatherUtils.getWeatherDetails).mockReturnValue({
      description: "Cloudy",
      image: "http://openweathermap.org/img/wn/03d@4x.png",
      color: "#808080",
    });
  });

  it("renders without crashing", () => {
    render(<WeatherStatsCard {...mockProps} />);
    expect(screen.getByText("12.1°C")).toBeInTheDocument();
  });

  it("displays the correct weather description", () => {
    render(<WeatherStatsCard {...mockProps} />);
    expect(screen.getByText("Cloudy")).toBeInTheDocument();
  });

  it("displays the correct temperature", () => {
    render(<WeatherStatsCard {...mockProps} />);
    expect(screen.getByText("12.1°C")).toBeInTheDocument();
  });

  it("displays the correct humidity", () => {
    render(<WeatherStatsCard {...mockProps} />);
    expect(screen.getByText("74%")).toBeInTheDocument();
    expect(screen.getByText("Humidity")).toBeInTheDocument();
  });

  it("displays the correct wind speed", () => {
    render(<WeatherStatsCard {...mockProps} />);
    expect(screen.getByText("15.9km/h")).toBeInTheDocument();
    expect(screen.getByText("Wind Speed")).toBeInTheDocument();
  });

  it("displays the correct pressure", () => {
    render(<WeatherStatsCard {...mockProps} />);
    expect(screen.getByText("1017.8hPa")).toBeInTheDocument();
    expect(screen.getByText("Pressure")).toBeInTheDocument();
  });

  it("displays the correct UV index", () => {
    render(<WeatherStatsCard {...mockProps} />);
    expect(screen.getByText("0.45")).toBeInTheDocument();
    expect(screen.getByText("UV")).toBeInTheDocument();
  });

  it("calls isNight with the correct time", () => {
    render(<WeatherStatsCard {...mockProps} />);
    expect(weatherUtils.isNight).toHaveBeenCalledWith("2025-03-29T16:30");
  });

  it("calls getWeatherDetails with the correct weather code and isNight result", () => {
    render(<WeatherStatsCard {...mockProps} />);
    expect(weatherUtils.getWeatherDetails).toHaveBeenCalledWith(
      3,
      false,
    );
  });

  it("renders the correct weather image", () => {
    render(<WeatherStatsCard {...mockProps} />);
    const imageElement = screen.getByAltText("cat"); // Image alt text is "cat"
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "http://openweathermap.org/img/wn/03d@4x.png",
    );
  });

  it("applies the correct weather color", () => {
    render(<WeatherStatsCard {...mockProps} />);
    const descriptionElement = screen.getByText("Cloudy");
    expect(descriptionElement).toHaveStyle("color: #808080");
  });

  it("displays 'NA' for missing values", () => {
    render(
      <WeatherStatsCard
        {...mockProps}
        // @ts-expect-error Missing values
        humidity={undefined}
        // @ts-expect-error Missing values
        windSpeed={undefined}
        // @ts-expect-error Missing values
        pressure={undefined}
        // @ts-expect-error Missing values
        uvIndex={undefined}
      />,
    );
    expect(screen.getByText("NA%")).toBeInTheDocument();
    expect(screen.getByText("NAkm/h")).toBeInTheDocument();
    expect(screen.getByText("NAhPa")).toBeInTheDocument();
    expect(screen.getByText("NA")).toBeInTheDocument();
  });
});
