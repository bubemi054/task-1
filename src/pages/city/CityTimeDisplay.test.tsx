import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import CityTimeDisplay from "./CityTimeDisplay";
import { describe, vi, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("CityTimeDisplay Component", () => {
  const mockProps = {
    cityName: "Lagos",
    time: "12:30 PM",
    dateString: "March 29, 2025",
  };

  it("renders the city name", () => {
    render(<CityTimeDisplay {...mockProps} />);
    expect(screen.getByText(mockProps.cityName)).toBeInTheDocument();
  });

  it("renders the correct time", () => {
    render(<CityTimeDisplay {...mockProps} />);
    expect(screen.getByText(mockProps.time)).toBeInTheDocument();
  });

  it("renders the correct date", () => {
    render(<CityTimeDisplay {...mockProps} />);
    expect(screen.getByText(mockProps.dateString)).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<CityTimeDisplay {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
