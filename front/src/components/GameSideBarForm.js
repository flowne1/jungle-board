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

  const handleFiltering = (input) => {
    store.setFilterString(input);
    store.doFilter();
  };

  useEffect(() => {
    store.fetchOwnedGames();
  }, []);

  const games = store.displayedGames;
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
        <input
          style={{ width: "300px" }}
          onChange={(e) => handleFiltering(e.target.value)}
          value={store.filterString}
        ></input>
        <div className={styles.gameSideSortContainer}>
          <button
            className={styles.gameSideSortBtn}
            onClick={store.sortByPlaytime}
          >
            {store.sortOrder === "" && "시간정렬-"}
            {store.sortOrder === "ascending" && "시간정렬↑"}
            {store.sortOrder === "descending" && "시간정렬↓"}
          </button>
          <button className={styles.gameSideSortBtn} onClick={store.sortByName}>
            {store.sortNameOrder === "" && "사전정렬-"}
            {store.sortNameOrder === "ascending" && "사전정렬↑"}
            {store.sortNameOrder === "descending" && "사전정렬↓"}
          </button>
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
