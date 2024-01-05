import { useEffect, useState } from "react";
import GameCardForm from "../components/GameCardForm";
import styles from "../styles.module.css";
import steamStore from "../stores/steamStore";

export default function OwnedGamesPage() {
  const store = steamStore();

  useEffect(() => {
    store.fetchOwnedGames();
  }, []);

  const games = store.ownedGames;

  // 게임 데이터가 로드되기 전에 로딩 메시지 표시
  if (!games) {
    return <div className={styles.ownedGamesPage}>Loading...</div>;
  }

  return (
    <div className={styles.ownedGamesPage}>
      <div>
        {games.map((game, index) => (
          <div className={styles.gameCardContainer} key={game.appid}>
            <img
              className={styles.gameCardImg}
              src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
              alt="noimage!"
            ></img>
            <div className={styles.gameCardContents}>
              <div className={styles.gameCardTitle}>{game.name}</div>
              <div className={styles.gameCardPlayTime}>
                playtime : {game.playtime_forever}
              </div>
            </div>
            <div className={styles.gameCardReviewBtn}>
              <button>리뷰 작성하기</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
