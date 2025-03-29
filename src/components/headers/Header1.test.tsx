// @ts-expect-error Need React imported for my tests
import React from "react";
import {
  render,
  cleanup,
} from "@testing-library/react";
import Header1 from "./Header1";
import { describe, vi, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Header1 Component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<Header1>Test Header</Header1>);
    expect(getByText("Test Header")).toBeInTheDocument();
  });

  it("applies default styles", () => {
    const { container } = render(<Header1>Styled Header</Header1>);
    const header = container.querySelector("h1");
    expect(header).toHaveClass(
      "text-2xl",
      "leading-tight",
      "font-extrabold",
      "text-white",
      "sm:text-3xl",
      "lg:text-4xl",
    );
  });

  it("merges custom class names", () => {
    const { container } = render(
      <Header1 className="custom-class">Custom Class</Header1>,
    );
    const header = container.querySelector("h1");
    expect(header).toHaveClass("custom-class");
  });
});
