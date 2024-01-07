import CreateForm from "../components/CreateForm";
import GameSideBarForm from "../components/GameSideBarForm";
import styles from "../styles.module.css";

export default function CreatePage() {
  return (
    <div className={styles.page}>
      <GameSideBarForm />
      <CreateForm />
    </div>
  );
}
