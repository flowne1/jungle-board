import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import steamStore from "../stores/steamStore";

export default function OwnedGamesPage() {
  const store = steamStore();

  useEffect(() => {
    store.fetchOwnedGames();
  }, []);

  const games = store.ownedGames;
  const appDetails = store.appDetails;

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
              <div>{game.appid}</div>
              <div className={styles.gameCardTitle}>{game.name}</div>
              <div className={styles.gameCardPlayTime}>
                playtime : {game.playtime_forever}
              </div>
              {appDetails && appDetails[game.appid] ? (
                <div>게임 정보가 있습니다</div>
              ) : (
                <div>게임 정보를 불러오는 중입니다</div>
              )}
            </div>
            <div className={styles.gameCardReviewBtn}>
              <button
                onClick={() => {
                  store.getAppDetails(game.appid);
                }}
              >
                정보 가져오기
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
