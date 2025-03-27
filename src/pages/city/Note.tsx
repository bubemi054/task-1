import { useState } from "react";
import { Pencil, Trash, Check } from "lucide-react";
import { Note } from "../../state-manager/types";

type NoteCardProps = {
  initialNote: Note;
  onSave: (updatedNote: Note) => void;
  onDelete: (note: Note) => void;
};

export default function NoteCard({
  initialNote,
  onSave,
  onDelete,
}: NoteCardProps) {
  const [note, setNote] = useState<Note>(initialNote);
  const [editMode, setEditMode] = useState<boolean>(!note.text);

  const handleEditNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote({ ...note, text: e.target.value });
  };

  const handleSaveNote = () => {
    if (!note.text.trim()) return;
    onSave({ ...note });
    setEditMode(false);
  };

  return (
    <div className="relative">
      <textarea
        className="flex h-[319px] w-[319px] flex-col justify-between rounded-lg bg-[rgba(0,0,0,0.2)] p-4 text-white backdrop-blur-[20px] outline-none [@media(max-width:380px)]:w-[100%]"
        disabled={!editMode}
        onChange={handleEditNote}
        value={note.text}
      />
      {editMode ? (
        <Check
          size={25}
          className="absolute right-3 bottom-3 cursor-pointer text-white"
          onClick={handleSaveNote}
        />
      ) : (
        <div>
          <Trash
            size={25}
            className="absolute right-11 bottom-3 cursor-pointer text-white"
            onClick={() => onDelete(note)}
          />
          <Pencil
            size={25}
            className="absolute right-3 bottom-3 cursor-pointer text-white"
            onClick={() => setEditMode(true)}
          />
        </div>
      )}
    </div>
  );
}
