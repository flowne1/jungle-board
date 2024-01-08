import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import steamStore from "../stores/steamStore";
import notesStore from "../stores/notesStore";

export default function OwnedGamesPage() {
  const store = steamStore();
  const nStore = notesStore();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false); // 사이드바 상태
  const [isRotating, setIsRotating] = useState(false);

  const handleSideBar = () => {
    setIsRotating(!isRotating);
    setIsSideBarOpen(!isSideBarOpen); // 상태 토글
  };

  useEffect(() => {
    store.fetchOwnedGames();
  }, []);

  const games = store.ownedGames;
  const appDetails = store.appDetails;

  // 게임 데이터가 로드되기 전에는 빈 div 표시
  if (!games) {
    return <div></div>;
  }

  return (
    <>
      <div
        className={styles.gameSide}
        style={{ left: isSideBarOpen ? "0px" : "-400px" }}
      >
        <div className={styles.gameSideSortContainer}>
          <button className={styles.gameSideSortBtn}>버튼1</button>
          <button className={styles.gameSideSortBtn}>버튼2</button>
          <button className={styles.gameSideSortBtn}>버튼3</button>
        </div>
        <div>
          {games.map((game, index) => (
            <div className={styles.gameSideContainer} key={game.appid}>
              <img
                className={styles.gameSideImg}
                src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                alt="noimage!"
              ></img>
              <div className={styles.gameSideContents}>
                <div className={styles.gameSideTitle}>{game.name}</div>
                <div className={styles.gameSidePlayTime}>
                  playtime : {game.playtime_forever}
                </div>
                {appDetails && appDetails[game.appid] ? (
                  <div style={{ color: "green", fontSize: "12px" }}>
                    App details 있음
                  </div>
                ) : (
                  <div style={{ color: "red", fontSize: "12px" }}>
                    App details 없음
                  </div>
                )}
              </div>
              <div className={styles.gameSideBtnContainer}>
                <div className={styles.gameSideBtn}>
                  <button
                    onClick={() => {
                      store.getAppDetails(game.appid);
                    }}
                  >
                    &larr;데이터 가져오기
                  </button>
                </div>
                <div className={styles.gameSideBtn}>
                  <button
                    onClick={() => {
                      nStore.updateCreateFormByAppdetails(
                        appDetails[game.appid],
                        game.playtime_forever
                      );
                    }}
                  >
                    데이터 불러오기&rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <img
        src="/steamlogo.png" // 이미지 경로
        className={`${styles.gameSideToggleBtn} ${
          isRotating ? styles.rotateForward : styles.rotateBackward
        }`}
        style={{ left: isSideBarOpen ? "400px" : "0px" }}
        onClick={handleSideBar}
        alt="Toggle Button"
      />
    </>
  );
}
