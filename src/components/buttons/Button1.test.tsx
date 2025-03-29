import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import Button1 from "./Button1";
import { describe, vi, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Button1 Component", () => {
  it("renders children correctly", () => {
    render(<Button1>Click Me</Button1>);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("applies additional classNames", () => {
    const { container } = render(
      <Button1 className="custom-class">Click</Button1>,
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button1 onClick={handleClick}>Click</Button1>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("has default Tailwind classes", () => {
    const { container } = render(<Button1>Click</Button1>);

    expect(container.firstChild).toHaveClass(
      "font-manrope",
      "bg-white",
      "hover:bg-gray-200",
    );
  });

  it("merges conflicting Tailwind classes correctly", () => {
    const { container } = render(
      <Button1 className="bg-red-500 hover:bg-blue-500">Click</Button1>,
    );

    expect(container.firstChild).toHaveClass("bg-red-500");
    expect(container.firstChild).not.toHaveClass("bg-white");
    expect(container.firstChild).toHaveClass("hover:bg-blue-500");
  });
});
