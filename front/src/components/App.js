import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import styles from "../styles.module.css";
import Navbar from "./Navbar";
import CreatePage from "../pages/CreatePage";
import ViewPage from "../pages/ViewPage";
import OwnedGamesPage from "../pages/OwnedGamesPage";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* printing mainpage, which is list of cards */}
          <Route
            index
            element={
              <RequireAuth>
                <NotesPage />
              </RequireAuth>
            }
          />
          {/* printing LoginPage */}
          <Route path="/login" element={<LoginPage />} />
          {/* printing CreatePage */}
          <Route
            path="/create"
            element={
              <RequireAuth>
                <CreatePage />
              </RequireAuth>
            }
          />
          {/* printing SignupPage */}
          <Route path="/signup" element={<SignupPage />} />
          {/* printing LogoutPage */}
          <Route path="/logout" element={<LogoutPage />} />
          {/* printing ViewPage */}
          <Route path="/viewpage/:noteId" element={<ViewPage />} />
          {/* printing OwnedGamesPage */}
          <Route path="/steam/owned-games" element={<OwnedGamesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
