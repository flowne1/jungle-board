import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import styles from "../styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import PrintStarRatingForm from "./PrintStarRatingForm";
import GameInfoPrintForm from "./GameInfoPrintForm";
import CommentPrintForm from "./CommentPrintForm";
import CommentInputForm from "./CommentInputForm";

export default function ViewForm() {
  const store = notesStore();
  const note = store.tempNote;
  const { noteId } = useParams(); // URL에서 noteId를 추출
  const navigate = useNavigate();

  useEffect(() => {
    store.fetchNote(noteId);
    store.fetchCommentAll(noteId);
  }, []);

  const handleUpdate = (e) => {
    e.stopPropagation();
    navigate(`/update/${note._id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    store.deleteNote(note._id);
    navigate("/");
  };

  const handleCreateComment = (e) => {
    e.stopPropagation();
    store.createComment(noteId);
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.viewform}>
      <div className={styles.viewpageTitleContainer}>
        <div className={styles.viewpageTitleContainer1}>
          <div className={styles.viewpageTitle}>{note.title}</div>
          <div>By {note.userEmail}</div>
          <div className={styles.viewpageTime}>
            {new Date(note.createdAt).toLocaleString("en-CA", {
              hour12: false,
            })}{" "}
            처음 작성됨
            <br />
            {new Date(note.updatedAt).toLocaleString("en-CA", {
              hour12: false,
            })}{" "}
            마지막 수정
            <div>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
        <div className={styles.viewpageTitleContainer2}>
          <div className={styles.viewpageMyinfoItem}>
            Rating
            <PrintStarRatingForm
              starRatingValue={note.starRatingAll.starRatingA}
            />
          </div>
          <div className={styles.viewpageMyinfoItem}>
            Total Played(min)
            <div style={{ color: "grey", fontSize: "20px" }}>
              {note.playTime}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <GameInfoPrintForm note={note} />
      <hr />
      리뷰 내용
      <div className={styles.viewpageBody}> {note.body}</div>
      <hr />
      댓글 작성하기
      <button onClick={handleCreateComment}>댓글 작성</button>
      <CommentInputForm />
      <hr />
      댓글
      {store.comments ? (
        store.comments.map((comment) => (
          <CommentPrintForm key={comment._id} comment={comment} />
        ))
      ) : (
        <div>댓글이 없습니다.</div>
      )}
    </div>
  );
}
