import { useEffect } from "react";
import CreateForm from "../components/CreateForm";
import GameSideBarForm from "../components/GameSideBarForm";
import notesStore from "../stores/notesStore";
import styles from "../styles.module.css";
import { useParams } from "react-router-dom";

export default function UpdatePage() {
  const store = notesStore();
  const { noteId } = useParams(); // URL에서 noteId를 추출

  useEffect(() => {
    store.fetchNote(noteId);
  }, []);

  if (!store.tempNote) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.page}>
      <GameSideBarForm />
      <CreateForm type="update" note={store.tempNote} />
    </div>
  );
}
