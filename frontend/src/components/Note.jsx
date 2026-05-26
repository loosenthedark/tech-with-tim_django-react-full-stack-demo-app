// Custom stylesheet
import "../styles/Note.css";

const Note = ({ note, onDelete }) => {
  const formattedNoteDate = new Date(note.created_at).toLocaleDateString(
    "en-GB",
  );

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.body}</p>
      <p className="note-date">{formattedNoteDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
};
export default Note;
