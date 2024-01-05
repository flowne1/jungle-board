import { create } from "zustand";
import axios from "axios";

const steamStore = create((set, get) => ({
  numGames: 0,
  ownedGames: null,

  fetchOwnedGames: async () => {
    try {
      // Fetch all owned games via steam api
      const res = await axios.get("/steam/owned-games");
      console.log(res);
      // Set numGames
      set({ numGames: res.data.game_count });
      // Set ownedGames
      set({ ownedGames: res.data.games });
    } catch (error) {
      console.error("Error fetching games", error);
    }
  },
}));

export default steamStore;
