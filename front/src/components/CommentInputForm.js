import notesStore from "../stores/notesStore";
import styles from "../styles.module.css";

export default function CommentInputForm() {
  const nStore = notesStore();
  return (
    <div className={styles.commentInputText}>
      <textarea
        placeholder="댓글을 입력하세요"
        name="contents"
        onChange={nStore.updateCommentFormField}
      ></textarea>
    </div>
  );
}
