import NotesList from "./components/NotesList";
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState([
    /*{
      id: nanoid(),
      text: "add notes in this application :)",
      date: "09/09/2023"
    },
    {
      id: nanoid(),
      text: "2nd note yey",
      date: "11/09/2023"
    },
    {
      id: nanoid(),
      text: "3rd note yey",
      date: "10/09/2023"
    },
    {
      id: nanoid(),
      text: "fourth note yey",
      date: "19/09/2023"
    }*/
  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search
          handleSearchNote={setSearchText}
        />
        <NotesList
          notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;