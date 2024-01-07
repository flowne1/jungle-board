import { create } from "zustand";
import axios from "axios";

const steamStore = create((set, get) => ({
  numGames: 0,
  ownedGames: null,
  appDetails: null,

  fetchOwnedGames: async () => {
    try {
      // Fetch all owned games via steam api
      const res = await axios.get("/steam/owned-games");
      // Set numGames
      set({ numGames: res.data.game_count });
      // Set ownedGames
      set({ ownedGames: res.data.games });
    } catch (error) {
      console.error("Error fetching games", error);
    }
  },

  getAppDetails: async (appid) => {
    try {
      // Fetch app details of app
      const res = await axios.get(`/steam/app-details/${appid}`);

      console.log(res);

      if (!res.data.success) {
        throw new Error("res returned 'not success'");
      }

      // Update appDetails in the state
      set((state) => {
        const updatedAppDetails = { ...state.appDetails, [appid]: res.data };
        return { appDetails: updatedAppDetails };
      });
    } catch (error) {
      console.error("Error fetching app details", error);
    }
  },
}));

export default steamStore;
