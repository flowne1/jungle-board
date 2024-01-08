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
      <img className={styles.cardImg} src={note.imgurl} alt="Card Img"></img>
      <div className={styles.cardTitle}>
        {note.title}
        <br />
        <PrintStarRatingForm starRatingValue={note.starRatingAll.starRatingA} />
      </div>
      <div>written by : {note.userEmail}</div>
      <div className={styles.cardDate}>
        {new Date(note.createdAt).toLocaleString("en-CA", { hour12: false })}{" "}
        <br />
        {/* {new Date(note.updatedAt).toLocaleDateString("en-CA")} */}
      </div>
    </div>
  );
}
