// @ts-expect-error Need React imported for my tests
import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import WeatherStatsCard from "./WeatherStatsCard";
import { describe, vi, it, expect, afterEach } from "vitest";
import * as weatherUtils from "../../utils/weather";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

vi.mock("../../utils/weather", () => ({
  isNight: vi.fn(),
  getWeatherStatus: vi.fn(),
}));

vi.mock("../../assets/wmo-code-images/wmo10-29.png", () => ({ default: "cat1" }));
vi.mock("../../assets/wmo-code-images/wmo30-59.png", () => ({ default: "cat2" }));
vi.mock("../../assets/wmo-code-images/wmo60-69.png", () => ({ default: "cat3" }));
vi.mock("../../assets/wmo-code-images/wmo70-79.png", () => ({ default: "cat4" }));
vi.mock("../../assets/wmo-code-images/wmo80-89.png", () => ({ default: "cat5" }));
vi.mock("../../assets/wmo-code-images/wmo90-99.png", () => ({ default: "cat6" }));
vi.mock("../../assets/wmo-code-images/dark-icon-1.png", () => ({ default: "cat1night" }));
vi.mock("../../assets/wmo-code-images/dark-icon-2.png", () => ({ default: "cat2night" }));
vi.mock("../../assets/wmo-code-images/dark-icon-3.png", () => ({ default: "cat3night" }));
vi.mock("../../assets/wmo-code-images/dark-icon-4.png", () => ({ default: "cat4night" }));
vi.mock("../../assets/wmo-code-images/dark-icon-5.png", () => ({ default: "cat5night" }));
vi.mock("../../assets/wmo-code-images/dark-icon-6.png", () => ({ default: "cat6night" }));

describe("WeatherStatsCard", () => {
  const mockProps = {
    time: "2025-03-29T16:30",

    interval: 900,

    temperature: 12.1,

    weatherCode: 3,

    windSpeed: 15.9,

    precipitation: 0,

    cloudcover: 100,

    humidity: 74,

    pressure: 1017.8,

    uvIndex: 0.45,
  };

  it("renders temperature, humidity, wind speed, pressure, and UV index", () => {
    vi.spyOn(weatherUtils, "isNight").mockReturnValue(false);
    vi.spyOn(weatherUtils, "getWeatherStatus").mockReturnValue({
      status: "Clear",
      color: "#FF8E27",
    });

    render(<WeatherStatsCard {...mockProps} />);

    expect(screen.getByText("12.1°C")).toBeInTheDocument();
    expect(screen.getByText("74%")).toBeInTheDocument();
    expect(screen.getByText("15.9km/h")).toBeInTheDocument();
    expect(screen.getByText("1017.8hPa")).toBeInTheDocument();
    expect(screen.getByText("0.45")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("displays correct weather image based on time of day", () => {
    vi.spyOn(weatherUtils, "isNight").mockReturnValue(true);
    vi.spyOn(weatherUtils, "getWeatherStatus").mockReturnValue({
      status: "Clear",
      color: "#FF8E27",
    });

    render(<WeatherStatsCard {...mockProps} />);

    const image = screen.getByAltText("cat");
    expect(image).toHaveAttribute("src", "cat1night");
  });

  it("displays the correct weather status color", () => {
    vi.spyOn(weatherUtils, "isNight").mockReturnValue(false);
    vi.spyOn(weatherUtils, "getWeatherStatus").mockReturnValue({
      status: "Clear",
      color: "#FF8E27",
    });

    render(<WeatherStatsCard {...mockProps} />);

    const statusElement = screen.getByText("Clear");
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveStyle("color: #FF8E27");
  });

  it("renders default values when missing data", () => {
    render(
      <WeatherStatsCard
        time=""
        temperature={NaN}
        humidity={NaN}
        windSpeed={NaN}
        pressure={NaN}
        uvIndex={NaN}
        weatherCode={NaN}
      />
    );

    expect(screen.getByText("NA%")).toBeInTheDocument();
    expect(screen.getByText("NAkm/h")).toBeInTheDocument();
    expect(screen.getByText("NAhPa")).toBeInTheDocument();
    expect(screen.getByText("NA")).toBeInTheDocument();
  });
});
