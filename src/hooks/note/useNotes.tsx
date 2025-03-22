import React, { useEffect, useState } from "react";
import type { Note } from "../../state-manager/types";
const STORAGE_KEY = "cityIdNotes";

function createNote(cityId: number | undefined, notes?: Note[], text?: string) {
  return {
    id: (notes?.at(-1)?.id || 0) + 1,
    cityId: cityId,
    text: text || "",
  };
}

export default function useNotes(cityId: number | undefined) {
  const [allNotes, setAllNotes] = useState<Note[]>();
  const [notes, setNotes] = useState<Note[]>();
  const [note, setNote] = useState<Note>();

  useEffect(() => {
    const notesString = localStorage?.getItem(STORAGE_KEY) || "[]";
    const notes = JSON.parse(notesString) as Note[];

    const filteredNotes = notes.filter((note) => note.cityId === cityId);
    setAllNotes(notes);
    setNotes(filteredNotes);
    setNote({ ...createNote(cityId, filteredNotes, "") });
  }, [cityId]);

  const changeNoteHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote((previousNote) => {
      if (previousNote) {
        return { ...previousNote, text: e.target.value };
      } else {
        return { ...createNote(cityId, [], e.target.value) };
      }
    });
  };

  const saveNoteHandler = () => {
    if (note && cityId && note?.text?.trim()) {
      const updatedNotes = [...(notes || []), note];
      const updatedAllNotes = [...(allNotes || []), note];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAllNotes));
      setAllNotes(updatedAllNotes);
      setNotes(updatedNotes);
      setNote({ ...createNote(cityId, updatedNotes, "") });
    }
  };

  const editNoteHandler = (updatedNote: Note) => {
    const updatedNotes = notes?.map((note) =>
      note.id === updatedNote.id
        ? updatedNote
        : note
    );
    const updatedAllNotes = allNotes?.map((note) =>
      note.id === updatedNote.id && note.cityId === cityId
        ? updatedNote
        : note
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAllNotes));
    setAllNotes(updatedAllNotes);
    setNotes(updatedNotes);
  };

  const deleteNoteHandler = (note: Note) => {
    const updatedNotes = notes?.filter((n) => n.id !== note.id);
    const updatedAllNotes = allNotes?.filter((n) => n.id !== note.id && n.cityId === cityId);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAllNotes));
    setAllNotes(updatedAllNotes);
    setNotes(updatedNotes);
  };

  return {
    notes,
    note,
    changeNoteHandler,
    saveNoteHandler,
    editNoteHandler,
    deleteNoteHandler,
  };
}
