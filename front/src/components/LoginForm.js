import { useNavigate } from "react-router-dom";
import authStore from "../stores/authStore";

export default function LoginForm() {
  const store = authStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    await store.login();

    // After login, navigate to main page
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      email address
      <br />
      <input
        type="email"
        onChange={store.updateLoginFormField}
        value={store.loginForm.email}
        name="email"
      />
      <br />
      password
      <br />
      <input
        type="password"
        onChange={store.updateLoginFormField}
        value={store.loginForm.password}
        name="password"
      />
      <br />
      <button type="submit">Login</button>
      <button type="button" onClick={store.logout}>
        Logout
      </button>
    </form>
  );
}
