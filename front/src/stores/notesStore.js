import { create } from "zustand";
import axios from "axios";

const notesStore = create((set, get) => ({
  notes: null,

  createForm: {
    title: "",
    body: "",
  },

  updateForm: {
    title: "",
    body: "",
  },

  fetchNotes: async () => {
    // Fetch the notes
    const res = await axios.get("http://localhost:3000/notes");

    // Set to state
    set({ notes: res.data.notes });
  },

  createNote: async (e) => {
    e.preventDefault();

    const { createForm, notes } = notesStore.getState();

    // Create the note
    const res = await axios.post("http://localhost:3000/notes", createForm);

    // Update and clear form state
    set({
      notes: [...notes, res.data.note],
      // Clear form state
      createForm: {
        title: "",
        body: "",
      },
    });
  },

  updateCreateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
  },

  updateNote: async () => {
    const { updateForm } = notesStore.getState();
    // Delete the note
    await axios.put(
      `http://localhost:3000/notes/${updateForm._id}`,
      updateForm
    );
  },

  toggleUpdate: (note) => {
    set(() => {
      return {
        updateForm: {
          _id: note._id,
          title: note.title,
          body: note.body,
        },
      };
    });
  },

  updateUpdateFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        updateForm: {
          ...state.updateForm,
          [name]: value,
        },
      };
    });
  },

  deleteNote: async (_id) => {
    // Delete the note
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);

    // Update state
    await get().fetchNotes();
  },
}));

export default notesStore;
