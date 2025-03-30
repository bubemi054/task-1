// @ts-expect-error Need React imported for my tests
import React from "react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import {
  isNight,
  formatTimeAndDate,
  wmoData,
  getWeatherDetails,
} from "./weather";

describe("isNight", () => {
  it("returns true for nighttime hours", () => {
    expect(isNight("2023-01-01T02:00:00Z")).toBe(true);
    expect(isNight("2023-01-01T19:00:00Z")).toBe(true);
  });

  it("returns false for daytime hours", () => {
    expect(isNight("2023-01-01T12:00:00Z")).toBe(false);
  });
});

describe("getWeatherDetails", () => {
  it("should return correct weather data for known WMO code during the day", () => {
    const result = getWeatherDetails(0, true);
    expect(result).toEqual(wmoData["0"].day);
  });

  it("should return correct weather data for known WMO code during the night", () => {
    const result = getWeatherDetails(1, false);
    expect(result).toEqual(wmoData["1"].night);
  });

  it("should fallback to the next available WMO code when given an unknown code", () => {
    const result = getWeatherDetails(4, true); // 4 is missing, next available is 45
    expect(result).toEqual(wmoData["45"].day);
  });

  it("should return default unknown weather data for completely unknown WMO codes", () => {
    const result = getWeatherDetails(999, true);
    expect(result).toEqual({
      description: "Unknown",
      image: "",
      color: "#000000",
      emoji: "",
    });
  });

  it("should handle edge cases properly", () => {
    const result = getWeatherDetails(-1, true); // Negative WMO codes don't exist
    expect(result).toEqual({
      description: "Unknown",
      image: "",
      color: "#000000",
      emoji: "",
    });
  });

  it("should handle the highest known WMO code correctly", () => {
    const result = getWeatherDetails(45, false);
    expect(result).toEqual(wmoData["45"].night);
  });

  it("should return the correct weather emoji for a given WMO code", () => {
    const result = getWeatherDetails(0, true);
    expect(result.emoji).toBe("☀️");
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
