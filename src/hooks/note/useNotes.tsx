import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cityActions } from "../../state-manager/citySlice";
import { RootState, AppDispatch } from "../../state-manager/store";
import type { Note } from "../../state-manager/types";

function createNote(cityId: number | undefined, notes?: Note[], text?: string) {
  return {
    id: (notes?.at(-1)?.id || 0) + 1,
    cityId: cityId,
    text: text || "",
  };
}

export default function useNotes(cityId: number | undefined) {
  const dispatch: AppDispatch = useDispatch();
  const { notes } = useSelector((state: RootState) => state.city);
  const [note, setNote] = useState<Note>();

  useEffect(() => {
    const filteredNotes = notes.filter((note) => note.cityId === cityId);
    setNote({ ...createNote(cityId, filteredNotes, "") });
  }, [cityId, notes]);

  const changeNoteHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote((previousNote) => {
      if (previousNote) {
        return { ...previousNote, text: e.target.value };
      } else {
        return { ...createNote(cityId, [], e.target.value) };
      }
    });
  };

  const setNotes = (notes: Note[]) => {
    dispatch(cityActions.updateNotes(notes));
  };

  const saveNoteHandler = () => {
    if (note && note?.text?.trim()) {
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
      setNote({ ...createNote(cityId, updatedNotes, "") });
    }
  };

  const editNoteHandler = (updatedNote: Note) => {
    const updatedNotes = notes?.map((note) =>
      note.id === updatedNote.id ? updatedNote : note,
    );

    setNotes(updatedNotes);
  };

  const deleteNoteHandler = (note: Note) => {
    const updatedNotes = notes?.filter((n) => n.id !== note.id);

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
