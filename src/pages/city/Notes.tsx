import { Send } from "lucide-react";
import useNotes from "../../hooks/note/useNotes";
import { WeatherResponse } from "../../state-manager/types";
import NoteCard from "./Note";

interface NotesProps {
  cityWeather: WeatherResponse;
}

function Notes({ cityWeather }: NotesProps) {
  const {
    notes,
    note,
    changeNoteHandler,
    saveNoteHandler,
    editNoteHandler,
    deleteNoteHandler,
  } = useNotes(cityWeather?.cityId);

  return (
    <div className="">
      <div className="flex items-center gap-2 mb-4">
        <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"></button>
        <h2 className="text-white text-2xl font-bold">Notes</h2>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative">
          <textarea
            className="w-[319px] h-[319px] p-4 backdrop-blur-[20px] bg-[rgba(0,0,0,0.2)] text-white rounded-lg relative min-h-[150px] flex flex-col justify-between outline-none"
            placeholder="Write your thoughts here..."
            value={note?.text || ""}
            onChange={changeNoteHandler}
          ></textarea>
          <Send
            size={25}
            onClick={saveNoteHandler}
            className="absolute bottom-3 right-3 text-white"
          />
        </div>
        {notes?.map((note) => (
          <div className="" key={note.id}>
            <NoteCard
              initialNote={note}
              onSave={editNoteHandler}
              onDelete={deleteNoteHandler}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
