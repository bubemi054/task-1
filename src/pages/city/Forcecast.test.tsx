// @ts-expect-error Need React imported for my tests
import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import Forecast from "./Forecast";
import { describe, vi, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Forecast Component", () => {
  const mockDaily = {
    time: [
      "2025-03-29",
      "2025-03-30",
      "2025-03-31",
      "2025-04-01",
      "2025-04-02",
      "2025-04-03",
      "2025-04-04",
    ],
    temperature_2m_max: [14.9, 12.2, 14, 14.4, 22.4, 25.7, 25.4],
    temperature_2m_min: [9.9, 9.7, 11.7, 12, 12.9, 13.4, 17],
    weathercode: [61, 61, 3, 3, 3, 2, 3],
  };

  it("renders 'No Data Available' when no forecast data is provided", () => {
    render(<Forecast />);
    expect(screen.getByText("No Data Available")).toBeInTheDocument();
  });

  it("renders forecast days correctly", () => {
    render(<Forecast daily={mockDaily} />);

    // Ensure forecast header is visible
    expect(screen.getByText("Forecast")).toBeInTheDocument();
    expect(screen.getByText("6 Days")).toBeInTheDocument();

    // Check the correct number of forecast entries (6 days)
    const forecastDays = screen.getAllByTestId("max-temp");
    expect(forecastDays).toHaveLength(6);

    // Check if formatted dates are displayed
    expect(screen.getByText("Sunday, Mar 30")).toBeInTheDocument();
    expect(screen.getByText("Monday, Mar 31")).toBeInTheDocument();
    expect(screen.getByText("Tuesday, Apr 1")).toBeInTheDocument();
    expect(screen.getByText("Wednesday, Apr 2")).toBeInTheDocument();
    expect(screen.getByText("Thursday, Apr 3")).toBeInTheDocument();
    expect(screen.getByText("Friday, Apr 4")).toBeInTheDocument();
  });
});
