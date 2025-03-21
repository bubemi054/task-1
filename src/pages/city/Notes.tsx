import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Note, WeatherResponse } from "../../state-manager/types";
import NoteCard from "./Note";

interface NotesProps {
  cityWeather: WeatherResponse;
}

function Notes({ cityWeather }: NotesProps) {
  const [notes, setNotes] = useState<Note[]>()
  const [note, setNote] = useState<Note>({
    id: (notes?.length || 0) + 1,
    text: "",
  });

  const handleChangeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote({ ...note, text: e.target.value });
  };

  const handleCreateNote = () => {
    if (!note.text.trim()) return;

    const newNote = { ...note, id: (notes?.length || 0) + 1 };

    const updatedNotes = [...(notes || []), newNote];
    
    setNotes([...updatedNotes])

    localStorage.setItem(`${cityWeather.cityId}`, JSON.stringify(updatedNotes));

    setNote({
      id: (notes?.length || 0) + 2,
      text: "",
    });
  };

  const handleUpdateNote = (updatedNote: Note) => {
    if (notes?.length === 0) return 

    const updatedNotes = (notes || []).map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );

    setNotes([...updatedNotes])

    localStorage.setItem(`${cityWeather.cityId}`, JSON.stringify(updatedNotes));
  };

  const handleDeleteNote = (note: Note) => {
      const newNotes = notes?.filter(n => n.id !== note.id)
      setNotes(newNotes)
  }

  useEffect(() => {
    const savedNotes = localStorage.getItem(`${cityWeather.cityId}`);
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes([...parsedNotes])
    }
  }, []);

  return (
    <div className="">
      <div className="flex items-center gap-2 mb-4">
        <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"></button>
        <h2 className="text-white text-2xl font-bold">Notes</h2>
      </div>

      <div className="flex gap-4">
        <div className="relative">
          <textarea
            className="w-[319px] h-[319px] p-4 backdrop-blur-[20px] bg-[rgba(0,0,0,0.2)] text-white rounded-lg relative min-h-[150px] flex flex-col justify-between outline-none"
            placeholder="Write your thoughts here..."
            value={note.text}
            onChange={handleChangeNote}
          ></textarea>
          <Send
            size={25}
            onClick={handleCreateNote}
            className="absolute bottom-3 right-3 text-white"
          />
        </div>
        {notes?.map((note) => (
          <div className="relative" key={note.id}>
            <NoteCard initialNote={note} onSave={handleUpdateNote} onDelete={handleDeleteNote} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
