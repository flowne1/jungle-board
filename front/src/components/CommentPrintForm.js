import notesStore from "../stores/notesStore";
import styles from "../styles.module.css";

export default function CommentForm({ key, comment }) {
  const nStore = notesStore();

  const deleteComment = (e) => {
    e.stopPropagation();

    nStore.deleteComment(comment);
  };

  return (
    <div className={styles.commentForm}>
      <div className={styles.commentTop}>
        {comment.userEmail}
        <div className={styles.commentDate}>
          {new Date(comment.createdAt).toLocaleString("en-CA", {
            hour12: false,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}{" "}
          에 댓글을 남겼습니다
        </div>
      </div>

      <div className={styles.commentContents}>{comment.contents}</div>
      <div className={styles.commentBtns}>
        <button onClick={deleteComment} className={styles.deleteButton}>
          삭제
        </button>
      </div>
    </div>
  );
}
