import CommentForm from "../components/CommentPrintForm";
import ViewForm from "../components/ViewForm";
import styles from "../styles.module.css";

export default function ViewPage() {
  return (
    <div className={styles.viewpage}>
      <ViewForm />
    </div>
  );
}
