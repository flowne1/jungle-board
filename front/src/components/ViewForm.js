import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import styles from "../styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import PrintStarRatingForm from "./PrintStarRatingForm";

export default function ViewForm() {
  const store = notesStore();
  const note = store.viewNote;
  const { noteId } = useParams(); // URL에서 noteId를 추출

  useEffect(() => {
    store.fetchNote(noteId);
  });

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.viewpage}>
      <div className={styles.viewpageTitle}>{note.title}</div>
      <div className={styles.viewpageTime}>
        {new Date(note.createdAt).toLocaleString("en-CA", { hour12: false })}{" "}
      </div>
      <hr></hr>
      <PrintStarRatingForm starRatingValue={note.starRatingAll.starRatingA} />
      <PrintStarRatingForm starRatingValue={note.starRatingAll.starRatingB} />
      <img
        className={styles.viewpageImg}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjIqqK4TYpTiCvwSBNr0LshkTxvyoksJAZbg&usqp=CAU"
        alt="VIEW IMG"
      ></img>
      <div className={styles.viewpageBody}> {note.body}</div>
    </div>
  );
}
