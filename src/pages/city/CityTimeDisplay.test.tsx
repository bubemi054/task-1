// @ts-expect-error Need React imported for my tests
import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import CityTimeDisplay from "./CityTimeDisplay";
import { describe, vi, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("CityTimeDisplay Component", () => {
  const mockToggleFavorite = vi.fn();
  const mockProps = {
    cityId: 1,
    cityName: "Lagos",
    time: "06:15",
    dateString: "Sun Mar 30 2025",
    toggleFavorite: mockToggleFavorite,
    isFavorite: false,
  };

  it("renders the city name", () => {
    render(<CityTimeDisplay {...mockProps} />);
    expect(screen.getByText(mockProps.cityName)).toBeInTheDocument();
  });

  it("renders the correct time", () => {
    render(<CityTimeDisplay {...mockProps} />);
    expect(screen.getByText(`${mockProps.time} UTC`)).toBeInTheDocument();
  });

  it("renders the correct date", () => {
    render(<CityTimeDisplay {...mockProps} />);
    expect(screen.getByText(mockProps.dateString)).toBeInTheDocument();
  });

  it("renders the star icon", () => {
    render(<CityTimeDisplay {...mockProps} />);
    expect(screen.getByRole("star-icon")).toBeInTheDocument();
  });

  it("calls toggleFavorite when the star icon is clicked", () => {
    render(<CityTimeDisplay {...mockProps} />);
    const starIcon = screen.getByRole("star-icon");
    fireEvent.click(starIcon);
    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockProps.cityId);
  });

  it("renders the star icon with correct fill when isFavorite is true", () => {
    render(<CityTimeDisplay {...mockProps} isFavorite={true} />);
    const starIcon = screen.getByRole("star-icon");
    expect(starIcon).toHaveAttribute("fill", "#F1CC51");
  });

  it("renders the star icon with correct fill when isFavorite is false", () => {
    render(<CityTimeDisplay {...mockProps} isFavorite={false} />);
    const starIcon = screen.getByRole("star-icon");
    expect(starIcon).toHaveAttribute("fill", "none");
  });
});
