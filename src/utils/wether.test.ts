import React from "react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { isNight, getWeatherStatus, formatTimeAndDate } from "./weather";

describe("isNight", () => {
  it("returns true for nighttime hours", () => {
    expect(isNight("2023-01-01T02:00:00Z")).toBe(true);
    expect(isNight("2023-01-01T19:00:00Z")).toBe(true);
  });

  it("returns false for daytime hours", () => {
    expect(isNight("2023-01-01T12:00:00Z")).toBe(false);
  });
});

describe("getWeatherStatus", () => {
  it("returns correct status and color for Clear weather", () => {
    expect(getWeatherStatus(10)).toEqual({ status: "Clear", color: "#FF8E27" });
  });

  it("returns correct status and color for Drizzle weather", () => {
    expect(getWeatherStatus(40)).toEqual({
      status: "Drizzle",
      color: "#8EC1DD",
    });
  });

  it("returns correct status and color for Rain weather", () => {
    expect(getWeatherStatus(65)).toEqual({ status: "Rain", color: "#27B1FF" });
  });

  it("returns correct status and color for Snow weather", () => {
    expect(getWeatherStatus(75)).toEqual({ status: "Snow", color: "#4E8DB1" });
  });

  it("returns correct status and color for Showers weather", () => {
    expect(getWeatherStatus(85)).toEqual({
      status: "Showers",
      color: "#8EC1DD",
    });
  });

  it("returns correct status and color for Thunderstorm weather", () => {
    expect(getWeatherStatus(95)).toEqual({
      status: "Thunderstorm",
      color: "#BF8EDD",
    });
  });

  it("returns Unknown status for out-of-range values", () => {
    expect(getWeatherStatus(150)).toEqual({
      status: "Unknown",
      color: "#9CA3AF",
    });
  });
});

describe("formatTimeAndDate", () => {
  it("formats time and date correctly", () => {
    const result = formatTimeAndDate(
      "2023-01-01T12:00:00Z",
      37.7749,
      -122.4194,
    );
    expect(result).toHaveProperty("time");
    expect(result).toHaveProperty("dateString");
  });

  it("returns N/A when given an empty string", () => {
    expect(formatTimeAndDate("", 37.7749, -122.4194)).toEqual({
      time: "N/A",
      dateString: "N/A",
    });
  });
});
