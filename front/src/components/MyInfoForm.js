import StarRatingForm from "./StarRatingForm";
import styles from "../styles.module.css";
import notesStore from "../stores/notesStore";

export default function MyInfoForm() {
  const nStore = notesStore();

  return (
    <div className={styles.myInfoContainer}>
      <div className={styles.myInfoPlaytime}>
        My Playtime
        <br />
        <input
          name="playTime"
          value={nStore.createForm.playTime}
          onChange={nStore.updateCreateFormField}
          type="text"
        ></input>
        분
      </div>
      <div className={styles.myInfoStar}>
        MY RATING
        <StarRatingForm ratingName="starRatingA" />
      </div>
    </div>
  );
}
