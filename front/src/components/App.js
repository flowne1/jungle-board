import { useState, useEffect } from "react";
import axios from "axios";
import notesStore from "../stores/notesStore";
import Notes from "./Notes";
import UpdateForm from "./UpdateForm";
import CreateForm from "./CreateForm";

function App() {
  // Manager for notes
  const store = notesStore();

  // Use Effects
  useEffect(() => {
    store.fetchNotes();
  }, []);

  return (
    <div className="App">
      {/* printing section */}
      <Notes />

      {/* create section */}
      <CreateForm />

      {/* update section */}
      <UpdateForm />
    </div>
  );
}

export default App;
