import { create } from "zustand";
import axios from "axios";

const steamStore = create((set, get) => ({
  numGames: 0,
  ownedGames: null,
  displayedGames: null,
  appDetails: null,
  filterString: "",
  filteredGames: null,
  sortOrder: "",
  sortNameOrder: "", // 추가된 상태

  fetchOwnedGames: async () => {
    try {
      // Fetch all owned games via steam api
      const res = await axios.get("/steam/owned-games");
      // Set numGames
      set({ numGames: res.data.game_count });
      // Set ownedGames
      set({ ownedGames: res.data.games });
      // Set displayedGames
      set({ displayedGames: res.data.games });
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

  sortByPlaytime: async () => {
    const currentOrder = get().sortOrder;
    const sortedGames = [...get().ownedGames].sort((a, b) => {
      if (currentOrder === "ascending") {
        return a.playtime_forever - b.playtime_forever;
      } else {
        return b.playtime_forever - a.playtime_forever;
      }
    });

    set({
      ownedGames: sortedGames,
      displayedGames: sortedGames,
      sortOrder: currentOrder === "ascending" ? "descending" : "ascending",
    });

    get().doFilter();
  },

  sortByName: async () => {
    const currentNameOrder = get().sortNameOrder;
    const sortedGames = [...get().ownedGames].sort((a, b) => {
      if (currentNameOrder === "ascending") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    set({
      ownedGames: sortedGames,
      displayedGames: sortedGames,
      sortNameOrder:
        currentNameOrder === "ascending" ? "descending" : "ascending",
    });

    get().doFilter();
  },

  setFilterString: (input) => {
    set({ filterString: input });
  },

  doFilter: () => {
    const ownedGames = get().ownedGames;
    if (!ownedGames) return;

    const filtered = ownedGames.filter((game) =>
      game.name.toLowerCase().includes(get().filterString.toLowerCase())
    );

    set({ displayedGames: filtered });
  },
}));

export default steamStore;
