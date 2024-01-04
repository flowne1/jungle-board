import { create } from "zustand";
import axios from "axios";

const notesStore = create((set, get) => ({
  notes: null,

  viewNote: null,

  createForm: {
    title: "",
    body: "",
  },

  updateForm: {
    title: "",
    body: "",
  },

  fetchNotes: async () => {
    try {
      // Fetch the notes
      const res = await axios.get("/notes");

      // Set to state
      set({ notes: res.data.notes });
    } catch (error) {
      console.error("Error fetching note", error);
    }
  },

  fetchNote: async (noteId) => {
    try {
      // Find by noteId and fetch the note
      const res = await axios.get(`/notes/${noteId}`);

      // Return proper note
      set({ viewNote: res.data.note });
    } catch (error) {
      console.error("Error fetching note", error);
    }
  },

  createNote: async (e) => {
    const { createForm, notes } = notesStore.getState();

    // Create the note
    const res = await axios.post("/notes", createForm);

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
    await axios.put(`/notes/${updateForm._id}`, updateForm);
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
    const res = await axios.delete(`/notes/${_id}`);

    // Update state
    await get().fetchNotes();
  },
}));

export default notesStore;
