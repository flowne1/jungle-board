import notesStore from "../stores/notesStore";
import styles from "../styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import GameInfoInputForm from "./GameInfoInputForm";
import MyInfoForm from "./MyInfoForm";
import { useEffect } from "react";

export default function CreateForm({ type, note }) {
  const store = notesStore();
  const navigate = useNavigate();
  const { noteId } = useParams();

  useEffect(() => {
    // If type === "update", set create form via note
    if (type === "update") {
      store.updateCreateFormByNote(note);
    }
  }, [type, note]);

  const handleCreate = async (e) => {
    e.preventDefault();

    await store.createNote();

    // After create, navigate to main page
    navigate("/");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await store.updateNote(noteId);

    // After update, navigate to view page
    navigate(`/viewpage/${noteId}`);
  };

  return (
    <form
      className={styles.inputForm}
      onSubmit={type === "update" ? handleUpdate : handleCreate}
    >
      <div className={styles.formTitle}>
        {type === "update" ? "리뷰 수정하기" : "새 리뷰 작성하기"}
      </div>
      <br />
      <input
        className={styles.inputTitle}
        onChange={store.updateCreateFormField}
        value={store.createForm.title}
        name="title"
        placeholder="제목을 입력하세요"
      />
      <br />
      <GameInfoInputForm />
      <br />
      <MyInfoForm />
      <br />
      <textarea
        className={styles.inputBody}
        onChange={store.updateCreateFormField}
        value={store.createForm.body}
        name="body"
        placeholder="내용을 입력하세요"
      />
      <br />
      <button className={styles.buttonCreate} type="submit">
        {type === "update" ? "Update note" : "Create note"}
      </button>
    </form>
  );
}
