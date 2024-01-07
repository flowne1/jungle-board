import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import styles from "../styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import PrintStarRatingForm from "./PrintStarRatingForm";
import GameInfoPrintForm from "./GameInfoPrintForm";

export default function ViewForm() {
  const store = notesStore();
  const note = store.tempNote;
  const { noteId } = useParams(); // URL에서 noteId를 추출
  const navigate = useNavigate();

  useEffect(() => {
    store.fetchNote(noteId);
  }, []);

  const handleUpdate = (e) => {
    e.stopPropagation();
    navigate(`/update/${note._id}`);
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.viewpage}>
      <div className={styles.viewpageTitleContainer}>
        <div className={styles.viewpageTitle}>{note.title}</div>
        <div className={styles.viewpageTime}>
          {new Date(note.createdAt).toLocaleString("en-CA", { hour12: false })}{" "}
        </div>
        <PrintStarRatingForm starRatingValue={note.starRatingAll.starRatingA} />
      </div>
      <hr />
      <GameInfoPrintForm note={note} />
      <hr />
      <div className={styles.viewpageBody}> {note.body}</div>
      <button onClick={handleUpdate}>업데이트에요</button>
    </div>
  );
}
