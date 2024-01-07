import { useState } from "react";
import styles from "../styles.module.css";
import notesStore from "../stores/notesStore";

export default function GameInfoForm() {
  const nStore = notesStore();

  const [isExpanded, setIsExpanded] = useState(true); // 접힘/펼침 상태

  const toggleExpansion = (e) => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.gameInfoContainer}>
      <div className={styles.gameInfoTitle}>
        <div className={styles.gameInfoTitleText}>GAME INFO FORM</div>
        <button
          type="button"
          onClick={toggleExpansion}
          className={styles.toggleButton}
        >
          {isExpanded ? "접기" : "펼치기"}
        </button>
      </div>
      {isExpanded && (
        <div className={styles.gameInfoContents}>
          <div>
            <img
              className={styles.gameInfoImg}
              src={
                nStore.createForm.imgurl
                  ? nStore.createForm.imgurl
                  : "https://via.placeholder.com/460x215"
              }
              alt="Game Img"
            />
          </div>
          <div className={styles.gameInfoDetails}>
            <label>
              장르
              <input
                onChange={nStore.updateCreateFormField}
                name="genre"
                value={nStore.createForm.genre}
                type="text"
                placeholder="장르를 입력하세요"
              />
            </label>
            <label>
              개발사
              <input
                onChange={nStore.updateCreateFormField}
                name="developer"
                value={nStore.createForm.developer}
                type="text"
                placeholder="개발사 및 배급사를 입력하세요"
              />
            </label>
            <label>
              출시일
              <input
                onChange={nStore.updateCreateFormField}
                name="releaseDate"
                value={nStore.createForm.releaseDate}
                type="date"
              />
            </label>
            <label>
              메타크리틱
              <input
                onChange={nStore.updateCreateFormField}
                name="metacriticUrl"
                value={nStore.createForm.metacriticUrl}
                type="text"
                placeholder="메타크리틱 링크를 입력하세요"
              />
            </label>
            <label>
              가격
              <input
                onChange={nStore.updateCreateFormField}
                name="price"
                value={nStore.createForm.price}
                type="text"
                placeholder="가격을 입력하세요"
              />
            </label>
            <label>
              스팀추천수
              <input
                onChange={nStore.updateCreateFormField}
                name="steamRec"
                value={nStore.createForm.steamRec}
                type="number"
                placeholder="스팀 추천수를 입력하세요"
              />
            </label>
            <label>
              한국어지원
              <div>
                <input
                  type="radio"
                  name="supportKorean"
                  onChange={nStore.updateCreateFormField}
                  value="true"
                  checked={nStore.createForm.supportKorean === true}
                />
                예
                <input
                  type="radio"
                  name="supportKorean"
                  onChange={nStore.updateCreateFormField}
                  value="false"
                  checked={nStore.createForm.supportKorean === false}
                />
                아니오
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
