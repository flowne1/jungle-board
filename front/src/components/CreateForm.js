import notesStore from "../stores/notesStore";
import styles from "../styles.module.css";
import { useNavigate } from "react-router-dom";
import StarRatingForm from "./StarRatingForm";

export default function CreateForm() {
  const store = notesStore();
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    await store.createNote();

    // After create, navigate to main page
    navigate("/");
  };

  return (
    <form className={styles.inputForm} onSubmit={handleCreate}>
      <span className={styles.formTitle}>새 글 작성하기</span>
      <br />
      <input
        className={styles.inputTitle}
        onChange={store.updateCreateFormField}
        value={store.createForm.title}
        name="title"
        placeholder="제목을 입력하세요"
      />
      <br />
      <StarRatingForm ratingName="starRatingA" />
      <StarRatingForm ratingName="starRatingB" />
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
        Create note
      </button>
    </form>
  );
}
