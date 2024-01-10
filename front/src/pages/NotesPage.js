import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import Notes from "../components/Notes";
import styles from "../styles.module.css";

export default function NotesPage() {
  // Manager for notes
  const store = notesStore();

  // Use Effects
  useEffect(() => {
    store.fetchNotes();
  }, []);

  if (store.notes === null) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.cardPage}>
      <Notes />
    </div>
  );
}
