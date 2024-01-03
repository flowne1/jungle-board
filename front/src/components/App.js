import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
        <Routes>
          {/* printing NotesPage */}
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
          {/* printing SignupPage */}
          <Route path="/signup" element={<SignupPage />} />
          {/* printing LogoutPage */}
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
