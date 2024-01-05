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
    try {
      const { createForm, notes, starRatingAll } = notesStore.getState();

      // Make object to be sent to server
      const createData = {
        createForm,
        starRatingAll,
      };

      // Create the note
      const res = await axios.post("/notes", createData);

      // Update and clear form state
      set({
        notes: [...notes, res.data.note],
        createForm: {
          title: "",
          body: "",
        },
        starRatingAll: {
          starRatingA: 0,
          starRatingB: 0,
        },
      });
    } catch (error) {
      // Handle the error appropriately
      console.error("Error creating note:", error);
    }
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

  starRatingAll: {
    starRatingA: 0,
    starRatingB: 0,
  },

  setStarRating: (name, value) => {
    set((state) => {
      return {
        starRatingAll: {
          ...state.starRatingAll,
          [name]: value,
        },
      };
    });
  },
}));

export default notesStore;
