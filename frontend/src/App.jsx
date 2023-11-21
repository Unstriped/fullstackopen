import { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Login from './components/Login';
import Footer from './components/Footer';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';
import Logout from './components/Logout';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

  useEffect(() => {
    function fetchData() {
      noteService.getAll().then((response) => {
        setNotes(response);
      });
    }
    fetchData();
  }, []);

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((response) => {
      setNotes(notes.concat(response));
    });
  };

  const toggleImportance = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((note) => (note.id !== id ? note : response)));
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  // do not render anything if notes is still null
  if (!notes) {
    return null;
  }

  return (
    <div>
      <h1>Notes App</h1>
      <Notification message={errorMessage} />

      {!user && (
        <Togglable buttonLabel="Log in">
          <Login setUser={setUser} setErrorMessage={setErrorMessage} />
        </Togglable>
      )}
      {user && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <p>{user.name} logged in</p>
            <Logout setUser={setUser} />
          </div>
          {
            <Togglable buttonLabel="New Note" ref={noteFormRef}>
              <NoteForm createNote={addNote} />
            </Togglable>
          }
        </div>
      )}

      <h2>Notes</h2>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default App;
