// @ts-expect-error Need React imported for my tests
import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import NoteCard from "./Note";
import { describe, vi, it, expect, afterEach } from "vitest";
import type { Note } from "../../state-manager/types";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("NoteCard Component", () => {
  const mockNote: Note = { id: 1, text: "Test Note", cityId: 123 };
  const mockOnSave = vi.fn();
  const mockOnDelete = vi.fn();

  it("renders the note text", () => {
    render(
      <NoteCard
        initialNote={mockNote}
        onSave={mockOnSave}
        onDelete={mockOnDelete}
      />,
    );
    expect(screen.getByDisplayValue(mockNote.text)).toBeInTheDocument();
  });

  it("enters edit mode when pencil icon is clicked", () => {
    render(
      <NoteCard
        initialNote={mockNote}
        onSave={mockOnSave}
        onDelete={mockOnDelete}
      />,
    );

    const editButton = screen.getByRole("edit-icon");
    fireEvent.click(editButton);

    const textarea = screen.getByRole("textbox");
    expect(textarea).not.toBeDisabled();
  });

  it("updates note text on change", () => {
    render(
      <NoteCard
        initialNote={mockNote}
        onSave={mockOnSave}
        onDelete={mockOnDelete}
      />,
    );

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Updated Note" } });

    expect(textarea).toHaveValue("Updated Note");
  });

  it("saves note when check icon is clicked", () => {
    render(
      <NoteCard
        initialNote={mockNote}
        onSave={mockOnSave}
        onDelete={mockOnDelete}
      />,
    );

    fireEvent.click(screen.getByRole("edit-icon"));

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Updated Note" } });

    fireEvent.click(screen.getByRole("save-icon"));

    expect(mockOnSave).toHaveBeenCalledWith({
      ...mockNote,
      text: "Updated Note",
    });
  });

  it("deletes note when trash icon is clicked", () => {
    render(
      <NoteCard
        initialNote={mockNote}
        onSave={mockOnSave}
        onDelete={mockOnDelete}
      />,
    );

    const deleteButton = screen.getByRole("delete-icon");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockNote);
  });

  it("toggles edit mode correctly", () => {
    render(
      <NoteCard
        initialNote={mockNote}
        onSave={mockOnSave}
        onDelete={mockOnDelete}
      />,
    );

    const editButton = screen.getByRole("edit-icon");

    fireEvent.click(editButton);
    expect(screen.queryByRole("save-icon")).toBeInTheDocument();
    expect(screen.queryByRole("edit-icon")).not.toBeInTheDocument();
    expect(screen.queryByRole("delete-icon")).not.toBeInTheDocument();

    fireEvent.click(screen.queryByRole("save-icon")!);
    expect(screen.queryByRole("edit-icon")).toBeInTheDocument();
    expect(screen.queryByRole("delete-icon")).toBeInTheDocument();
    expect(screen.queryByRole("save-icon")).toBeNull();
  });
});
