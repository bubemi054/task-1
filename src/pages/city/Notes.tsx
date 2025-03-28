import { Send } from "lucide-react";
import useNotes from "../../hooks/note/useNotes";
import { WeatherResponse } from "../../state-manager/types";
import NoteCard from "./Note";

type NotesProps = {
  cityWeather: WeatherResponse;
};

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
    <div className="w-full">
      <div className="mb-4 flex items-center gap-2">
        <button className="rounded-full bg-white/20 p-2 transition hover:bg-white/30"></button>
        <h2 className="text-2xl font-bold text-white">Notes</h2>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="relative [@media(max-width:380px)]:w-full">
          <textarea
            className="relative flex h-[319px] min-h-[150px] w-[319px] flex-col justify-between rounded-lg bg-[rgba(0,0,0,0.2)] p-4 text-white backdrop-blur-[20px] outline-none [@media(max-width:380px)]:w-[100%]"
            placeholder="Write your thoughts here..."
            value={note?.text || ""}
            onChange={changeNoteHandler}
          ></textarea>
          <Send
            size={25}
            onClick={saveNoteHandler}
            className="absolute right-3 bottom-3 text-white"
          />
        </div>
        {notes?.map((note) => (
          <div className="[@media(max-width:380px)]:w-full" key={note.id}>
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
