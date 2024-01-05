import { useNavigate } from "react-router-dom";
import notesStore from "../stores/notesStore";
import styles from "../styles.module.css";
import PrintStarRatingForm from "./PrintStarRatingForm";

export default function Card({ note }) {
  const store = notesStore();
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    e.preventDefault();

    navigate(`/viewpage/${note._id}`);
  };

  return (
    <div
      className={styles.cardContainer}
      key={note._id}
      onClick={handleCardClick}
    >
      <img
        className={styles.cardImg}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjIqqK4TYpTiCvwSBNr0LshkTxvyoksJAZbg&usqp=CAU"
        alt="Card Img"
      ></img>
      <div className={styles.cardTitle}>
        {note.title}
        <br />
        <PrintStarRatingForm starRatingValue={note.starRatingAll.starRatingA} />
        <PrintStarRatingForm starRatingValue={note.starRatingAll.starRatingB} />
      </div>
      <div>
        <button
          onClick={(e) => {
            store.deleteNote(note._id);
            e.stopPropagation();
          }}
        >
          Show
        </button>
        <button
          onClick={(e) => {
            store.deleteNote(note._id);
            e.stopPropagation();
          }}
        >
          Delete
        </button>
        <button
          onClick={(e) => {
            store.toggleUpdate(note);
            e.stopPropagation();
          }}
        >
          Update
        </button>
      </div>
      <div className={styles.cardDate}>
        {new Date(note.createdAt).toLocaleString("en-CA", { hour12: false })}{" "}
        <br />
        {/* {new Date(note.updatedAt).toLocaleDateString("en-CA")} */}
      </div>
    </div>
  );
}
