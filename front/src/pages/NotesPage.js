import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import Notes from "../components/Notes";
import CreateForm from "../components/CreateForm";
import UpdateForm from "../components/UpdateForm";

export default function NotesPage() {
  // Manager for notes
  const store = notesStore();

  // Use Effects
  useEffect(() => {
    store.fetchNotes();
  }, []);
  return (
    <div>
      {/* printing section */}
      <Notes />

      {/* create section */}
      <CreateForm />

      {/* update section */}
      <UpdateForm />
    </div>
  );
}
