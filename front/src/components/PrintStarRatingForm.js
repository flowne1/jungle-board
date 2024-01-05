import { FaStar } from "react-icons/fa";
import styles from "../styles.module.css";
import notesStore from "../stores/notesStore";
import { useState } from "react";

export default function PrintStarRatingForm({ starRatingValue }) {
  const store = notesStore();

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        return (
          <label key={index}>
            <FaStar
              size={30}
              color={
                starRatingValue >= index + 1 // hoverRating의 유무에 따라 체크
                  ? "#ffc107"
                  : "#e4e5e9"
              }
            />
          </label>
        );
      })}
    </div>
  );
}
