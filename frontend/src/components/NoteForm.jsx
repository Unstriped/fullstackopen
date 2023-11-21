import { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const addNote = async (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: true,
    });

    setNewNote('');
  };

  return (
    <div className="formDiv">
      <h2>Create a new Note</h2>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          placeholder="a new note..."
          id="note-input"
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
