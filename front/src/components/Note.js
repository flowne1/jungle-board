import notesStore from "../stores/notesStore";

export default function Note({ note }) {
  const store = notesStore((state) => ({
    deleteNote: state.deleteNote,
    toggleUpdate: state.toggleUpdate,
  }));

  return (
    <div key={note._id}>
      <hr></hr>
      <h3>{note.title}</h3>
      <h4>{note.body}</h4>
      <button onClick={() => store.deleteNote(note._id)}>Delete note</button>
      <button onClick={() => store.toggleUpdate(note)}>toggle update</button>
      <hr></hr>
    </div>
  );
}
