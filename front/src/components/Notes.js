import notesStore from "../stores/notesStore";
import CardForm from "./CardForm";
import styles from "../styles.module.css";

export default function Notes() {
  const store = notesStore();

  // store.notes가 undefined이거나 배열이 아닐 경우 빈 배열로 처리
  const notes = store.notes ?? [];

  // Reverse order of notes
  const reversedNotes = [...notes].reverse();

  return (
    <div className={styles.cardPage}>
      {reversedNotes &&
        reversedNotes.map((note) => {
          return <CardForm key={note._id} note={note} />;
        })}
    </div>
  );
}
