import styles from "../styles.module.css";

export default function GameCardForm() {
  return (
    <div className={styles.gameCardForm}>
      <img
        className={styles.gameCardImg}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjIqqK4TYpTiCvwSBNr0LshkTxvyoksJAZbg&usqp=CAU"
        alt="Card Img"
      ></img>
      <div className={styles.gameCardContents}>
        <div className={styles.gameCardTitle}>
          게임 카드 폼이에요 게임 카드 폼이에요 게임 카드 폼이에요 게임 카드
          폼이에요 게임 카드 폼이에요
        </div>
        <hr />
        <div className={styles.gameCardPlayTime}>
          플레이시간이에요플레이시간이에요플레이시간이에요
        </div>
      </div>
    </div>
  );
}
