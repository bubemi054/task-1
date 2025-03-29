// @ts-expect-error Need React imported for my tests
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import SearchDropdownInput from "./SearchDropdownInput";
import { describe, vi, it, expect, afterEach } from "vitest";
import type { City } from "../../state-manager/types";
import "@testing-library/jest-dom/vitest";

const mockCities: City[] = [
  {
    cityId: 2013348,

    name: "Vladivostok",

    altCountry: "",

    country: "RU",

    featureCode: "PPLA",

    adminCode: "59",

    population: 587022,

    loc: { type: "Point", coordinates: [43.10562, 131.87353] },
  },

  {
    cityId: 2023469,

    name: "Irkutsk",

    altCountry: "",

    country: "RU",

    featureCode: "PPLA",

    adminCode: "20",

    population: 586695,

    loc: { type: "Point", coordinates: [52.29778, 104.29639] },
  },

  {
    cityId: 931755,

    name: "Blantyre",

    altCountry: "",

    country: "MW",

    featureCode: "PPLA",

    adminCode: "S",

    population: 584877,

    loc: { type: "Point", coordinates: [-15.78499, 35.00854] },
  },
];

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("SearchDropdownInput Component", () => {
  it("renders input field and search icon", () => {
    render(<SearchDropdownInput isOffline={false} />);
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("updates input value on change", () => {
    const handleChange = vi.fn();
    render(
      <SearchDropdownInput
        value=""
        onChange={handleChange}
        isOffline={false}
      />,
    );
    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "Lag" } });
    expect(handleChange).toHaveBeenCalledWith("Lag");
  });

  it("does not open dropdown when offline", () => {
    render(<SearchDropdownInput isOffline={true} items={mockCities} />);
    fireEvent.focus(screen.getByTestId("search-input"));
    expect(screen.queryByTestId("search-dropdown")).not.toBeInTheDocument();
  });

  it("opens dropdown when input is focused", async () => {
    render(<SearchDropdownInput isOffline={false} items={mockCities} />);
    fireEvent.focus(screen.getByTestId("search-input"));
    await waitFor(() =>
      expect(screen.getByTestId("search-dropdown")).toBeInTheDocument(),
    );
  });

  it("filters dropdown items based on input", async () => {
    render(<SearchDropdownInput isOffline={false} items={mockCities} />);
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "Bla" } });
    fireEvent.focus(input);

    await waitFor(() => {
      expect(screen.getByTestId("search-dropdown")).toBeInTheDocument();
      expect(screen.getByText("Blantyre")).toBeInTheDocument();
    });
  });

  it("calls onSelect when an item is clicked", async () => {
    const handleSelect = vi.fn();
    render(
      <SearchDropdownInput
        isOffline={false}
        items={mockCities}
        onSelect={handleSelect}
      />,
    );
    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "Vladivos" } });
    fireEvent.focus(input);

    await waitFor(() =>
      expect(screen.getByTestId("search-dropdown")).toBeInTheDocument(),
    );
    fireEvent.click(screen.getByText("Vladivostok"));
    expect(handleSelect).toHaveBeenCalledWith(mockCities[0]);
  });
});
