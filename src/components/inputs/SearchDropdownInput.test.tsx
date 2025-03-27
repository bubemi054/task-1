import React, { useState } from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import SearchDropdownInput from "./SearchDropdownInput";
import { describe, vi, it, expect, afterEach } from "vitest";
import { City } from "../../state-manager/types";
import "@testing-library/jest-dom/vitest";

const mockCities: City[] = [
  {
    name: "Lagos",
    country: "Nigeria",
    address: "Lagos, Nigeria",
    area_km2: 2442,
    lat: 6.5244,
    lon: 3.3792,
  },
  {
    name: "London",
    country: "United Kingdom",
    address: "London, UK",
    area_km2: 2442,
    lat: 51.5072,
    lon: -0.1276,
  },
  {
    name: "Los Angeles",
    country: "United States",
    address: "Los Angeles, USA",
    area_km2: 2442,
    lat: 34.0522,
    lon: -118.2437,
  },
];

afterEach(cleanup);

function ControlledSearchDropdown({
  onSelect,
}: {
  onSelect?: (item: string) => void;
}) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchDropdownInput
      value={searchValue}
      onChange={setSearchValue}
      items={mockCities}
      onSelect={onSelect}
    />
  );
}

describe("SearchDropdownInput", () => {
  it("renders input with placeholder", () => {
    render(<ControlledSearchDropdown />);
    expect(screen.getByTestId("search-input-general")).toBeInTheDocument();
  });

  it("opens dropdown when input is focused", async () => {
    render(<ControlledSearchDropdown />);
    const input = screen.getByTestId("search-input-general");
    fireEvent.focus(input);
    await waitFor(() => {
      expect(screen.getByText("Lagos, Nigeria")).toBeInTheDocument();
    });
  });

  it("filters dropdown items based on input", async () => {
    render(<ControlledSearchDropdown />);
    const input = screen.getByTestId("search-input-general");

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Lo" } });

    await waitFor(() => {
      expect(screen.getByText("London, UK")).toBeInTheDocument();
      expect(screen.getByText("Los Angeles, USA")).toBeInTheDocument();
      expect(screen.queryByText("Lagos, Nigeria")).not.toBeInTheDocument();
    });
  });

  it("calls onSelect with correct value when an item is clicked", async () => {
    const onSelectMock = vi.fn();
    render(<ControlledSearchDropdown onSelect={onSelectMock} />);

    const input = screen.getByTestId("search-input-general");
    fireEvent.focus(input);
    await waitFor(() =>
      expect(screen.getByText("Lagos, Nigeria")).toBeInTheDocument(),
    );

    fireEvent.click(screen.getByText("Lagos, Nigeria"));

    expect(onSelectMock).toHaveBeenCalledWith("Lagos");
  });

  it("closes dropdown after blur", async () => {
    render(<ControlledSearchDropdown />);
    const input = screen.getByTestId("search-input-general");

    fireEvent.focus(input);
    await waitFor(() =>
      expect(screen.getByText("Lagos, Nigeria")).toBeInTheDocument(),
    );

    fireEvent.blur(input);
    await waitFor(
      () =>
        expect(screen.queryByText("Lagos, Nigeria")).not.toBeInTheDocument(),
      { timeout: 500 },
    );
  });
});
