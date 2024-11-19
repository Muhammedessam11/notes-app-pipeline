import React, { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const addNote = () => {
    fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: newNote })
    })
      .then((res) => res.json())
      .then((note) => setNotes((prev) => [...prev, note]));
    setNewNote("");
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
      <input
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Write a note..."
      />
      <button onClick={addNote}>Add Note</button>
    </div>
  );
}

export default App;

