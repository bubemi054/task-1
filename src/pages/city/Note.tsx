import { useState, useRef, useEffect } from "react";
import { Send, Pencil, Trash } from "lucide-react";
import { Note } from "../../state-manager/types";

interface NoteCardProps {
  initialNote: Note;
  onSave: (updatedNote: Note) => void;
  onDelete: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  initialNote,
  onSave,
  onDelete,
}) => {
  const noteRef = useRef<HTMLTextAreaElement>(null);
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

  useEffect(() => {
  if (editMode && noteRef.current) {
    noteRef.current.focus();
  }
}, [editMode]);


  return (
    <div className="relative">
      <textarea
        ref={noteRef}
        className="w-[319px] h-[319px] p-4 backdrop-blur-[20px] bg-[rgba(0,0,0,0.2)] 
        text-white rounded-lg min-h-[150px] flex flex-col justify-between outline-none"
        disabled={!editMode}
        onChange={handleEditNote}
        value={note.text}
      />
      {editMode ? (
        <Send
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
};

export default NoteCard;
