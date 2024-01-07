import { create } from "zustand";
import axios from "axios";

const notesStore = create((set, get) => ({
  notes: null,

  tempNote: null,

  createFormDefault: {
    title: "",
    body: "",
    genre: "",
    developer: "",
    publisher: "",
    releaseDate: "",
    metacriticUrl: "",
    price: "",
    steamRec: "",
    supportKorean: false,
    imgurl: "",
    playTime: "",
  },

  createForm: {
    title: "",
    body: "",
    genre: "",
    developer: "",
    publisher: "",
    releaseDate: "",
    metacriticUrl: "",
    price: "",
    steamRec: "",
    supportKorean: false,
    imgurl: "",
    playTime: "",
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

      console.log(notesStore.getState().tempNote);

      // Return proper note
      set({ tempNote: res.data.note });
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
        createForm: { ...notesStore.getState().defaultCreateForm },
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
    let { name, value } = e.target;
    if (name === "supportKorean") {
      value = value === "true";
    }

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          [name]: value,
        },
      };
    });
    const updatedStates = notesStore.getState();
    console.log(updatedStates.createForm);
  },

  updateCreateFormByAppdetails: (appDetails, playtime) => {
    console.log(appDetails);
    const data = appDetails.data;

    const dateFormatted = new Date(data.release_date.date)
      .toISOString()
      .split("T")[0];

    set((state) => {
      return {
        createForm: {
          ...state.createForm,
          title: data.name,
          genre:
            data.genres?.map((genre) => genre.description).join(", ") ||
            "DATA NOT AVAILABLE",
          developer: data.developers?.join(", ") || "DATA NOT AVAILABLE",
          publisher: data.publishers?.join(", ") || "DATA NOT AVAILABLE",
          releaseDate: dateFormatted,
          metacriticUrl: data.metacritic?.url || "DATA NOT AVAILABLE",
          price: data.price_overview
            ? data.price_overview.initial_formatted
              ? data.price_overview.initial_formatted
              : data.price_overview.final_formatted
              ? `${data.price_overview.final_formatted} (Discount: ${data.price_overview.discount_percent}%)`
              : "DATA NOT AVAILABLE"
            : "DATA NOT AVAILABLE",
          steamRec: data.recommendations?.total || "DATA NOT AVAILABLE",
          supportKorean: data.supported_languages?.includes("Korean") || false,
          imgurl: data.header_image || "",
          playTime: playtime,
        },
      };
    });
  },

  updateCreateFormByNote: (note) => {
    set((state) => {
      return {
        createForm: {
          title: note.title,
          body: note.body,
          genre: note.genre,
          developer: note.developer,
          publisher: note.publisher,
          releaseDate: note.releaseDatae,
          metacriticUrl: note.metacriticUrl,
          price: note.price,
          steamRec: note.steamRec,
          supportKorean: note.supportKorean,
          imgurl: note.imgurl,
          playTime: note.playTime,
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
