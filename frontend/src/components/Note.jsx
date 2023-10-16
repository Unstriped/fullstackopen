const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "Make not Important" : "Make Important";

  return (
    <li className="note">
      {note.content} {note.id}{" "}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
