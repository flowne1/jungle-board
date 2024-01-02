import { create } from "zustand";
import axios from "axios";

const authStore = create((set, get) => ({
  loginForm: {
    email: "",
    password: "",
  },
  login: async (e) => {
    e.preventDefault();

    const { loginForm } = authStore.getState();

    try {
      const res = await axios.post("/login", loginForm);
      console.log(res);
    } catch (error) {
      console.error("Login error:", error);
    }
  },
  updateLoginFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        },
      };
    });
    const updatedStates = authStore.getState();
    console.log(updatedStates.loginForm);
  },
}));

export default authStore;
