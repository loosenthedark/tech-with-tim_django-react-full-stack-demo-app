import { useEffect, useState } from "react";

import api from "../api";
import NoteComponent from "../components/Note";
// Custom stylesheet
import "../styles/Home.css";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteBody, setNewNoteBody] = useState("");

  const fetchNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((notesData) => {
        setNotes(notesData);
        console.log(notesData);
      })
      .catch((error) => alert(error));
  };

  const createNewNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { title: newNoteTitle, body: newNoteBody })
      .then((res) => {
        if (res.status === 201) {
          alert("Note successfully created!");
        } else {
          alert("Failed to create note... Please try again!");
        }
        fetchNotes();
      })
      .catch((error) => alert(error));
  };

  const deleteNote = (noteId) => {
    api
      .delete(`api/note/delete/${noteId}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note successfully deleted!");
        } else {
          alert("Failed to delete note... Please try again!");
        }
        fetchNotes();
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <NoteComponent note={note} key={note.id} onDelete={deleteNote} />
        ))}
      </div>
      <h2>Create a new Note...</h2>
      <form onSubmit={createNewNote}>
        <label htmlFor="note-title">Title:</label>
        <br />
        <input
          id="note-title"
          name="noteTitle"
          required
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
        />
        <br />
        <label htmlFor="note-body">Body:</label>
        <br />
        <textarea
          id="note-body"
          name="noteBody"
          required
          value={newNoteBody}
          onChange={(e) => setNewNoteBody(e.target.value)}
        />
        <br />
        <input type="submit" value="Create Note" />
      </form>
    </div>
  );
};
export default Home;
