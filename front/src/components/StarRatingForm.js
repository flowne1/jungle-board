import { FaStar } from "react-icons/fa";
import styles from "../styles.module.css";
import notesStore from "../stores/notesStore";
import { useState } from "react";

export default function StarRatingForm({ ratingName }) {
  const store = notesStore();
  const InStoreRating = store.starRatingAll[ratingName];
  const [hoverRating, setHoverRating] = useState(null); // 호버를 위한 state

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label
            key={index}
            onMouseEnter={() => setHoverRating(currentRating)} // 마우스가 올라갔을 때
            onMouseLeave={() => setHoverRating(null)} // 마우스가 떠났을 때
          >
            <input
              type="radio"
              name={ratingName}
              value={currentRating}
              className={styles.starRatingRadio}
              onClick={() => store.setStarRating(ratingName, currentRating)}
            />
            <FaStar
              size={30}
              color={
                (hoverRating || InStoreRating) >= currentRating // hoverRating의 유무에 따라 체크
                  ? "#ffc107"
                  : "#e4e5e9"
              }
            />
          </label>
        );
      })}
      <div>
        Current Rating for {ratingName}: {InStoreRating}
      </div>
    </div>
  );
}
