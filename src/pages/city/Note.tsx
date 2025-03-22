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
        className="w-[319px] h-[319px] p-4 backdrop-blur-[20px] bg-[rgba(0,0,0,0.2)] 
        text-white rounded-lg min-h-[150px] flex flex-col justify-between outline-none"
        disabled={!editMode}
        onChange={handleEditNote}
        value={note.text}
      />
      {editMode ? (
        <Check
          size={25}
          className="absolute bottom-3 right-3 text-white cursor-pointer"
          onClick={handleSaveNote}
        />
      ) : (
        <div>
          <Trash
            size={25}
            className="absolute bottom-3 right-11 text-white cursor-pointer"
            onClick={() => onDelete(note)}
          />
          <Pencil
            size={25}
            className="absolute bottom-3 right-3 text-white cursor-pointer"
            onClick={() => setEditMode(true)}
          />
        </div>
      )}
    </div>
  );
}
