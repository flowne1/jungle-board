import styles from "../styles.module.css";

export default function GameInfoPrintForm({ note }) {
  return (
    <div className={styles.gameInfoPrintContainer}>
      <div>
        <img
          className={styles.gameInfoPrintImg}
          src={
            note.imgurl ? note.imgurl : "https://via.placeholder.com/460x215"
          }
          alt="Game Img"
        />
      </div>
      <div className={styles.gameInfoItemsAll}>
        <div className={styles.gameInfoItem}>장르: {note.genre}</div>
        <div className={styles.gameInfoItem}>개발사: {note.developer}</div>
        <div className={styles.gameInfoItem}>출시일: {note.releaseDate}</div>
        <div className={styles.gameInfoItem}>
          메타크리틱:{" "}
          <a
            href={note.metacriticUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            [링크]
          </a>
        </div>
        <div className={styles.gameInfoItem}>가격: {note.price}</div>
        <div className={styles.gameInfoItem}>스팀추천수: {note.steamRec}</div>
        <div className={styles.gameInfoItem}>
          한국어지원: {note.supportKorean ? "지원함" : "지원하지않음"}
        </div>
      </div>
    </div>
  );
}
