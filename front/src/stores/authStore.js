import { create } from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  loggedIn: null,

  loginForm: {
    email: "",
    password: "",
  },

  signupForm: {
    email: "",
    password: "",
    passwordCheck: "",
  },

  login: async (e) => {
    const { loginForm } = authStore.getState();

    try {
      const res = await axios.post("/login", loginForm, {
        withCredentials: true,
      });
      // Clear password input
      set({
        loggedIn: true,
        loginForm: {
          email: loginForm.email,
          password: "",
        },
      });
      // Print log
      console.log(res);
    } catch (error) {
      // Clear password input
      set({
        loginForm: {
          email: loginForm.email,
          password: "",
        },
      });
      // Print error log
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

  signup: async (e) => {
    const { signupForm, loginForm } = authStore.getState();

    try {
      const res = await axios.post("/signup", signupForm, {
        withCredentials: true,
      });

      // Set email of loginForm properly
      set({
        loginForm: {
          email: signupForm.email,
          password: "",
        },
      });

      // Clear signupForm
      set({
        signupForm: {
          email: "",
          password: "",
          passwordCheck: "",
        },
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },

  updateSignupFormField: (e) => {
    const { name, value } = e.target;

    set((state) => {
      return {
        signupForm: {
          ...state.signupForm,
          [name]: value,
        },
      };
    });
    const updatedStates = authStore.getState();
    console.log(updatedStates.signupForm);
  },

  logout: async (e) => {
    const res = await axios.get("/logout");
    set({ loggedIn: false });
    console.log(res);
  },

  checkAuth: async () => {
    try {
      await axios.get("/check-auth");
      set({ loggedIn: true });
    } catch (err) {
      set({ loggedIn: false });
    }
  },
}));

export default authStore;
