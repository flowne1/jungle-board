import { useNavigate } from "react-router-dom";
import authStore from "../stores/authStore";

export default function SignupForm() {
  const store = authStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    await store.signup();

    // After signup, navigate to login page
    navigate("/login");
  };

  return (
    <form onSubmit={handleSignup}>
      email address
      <br />
      <input
        type="email"
        onChange={store.updateSignupFormField}
        value={store.signupForm.email}
        name="email"
      />
      <br />
      password
      <br />
      <input
        type="password"
        onChange={store.updateSignupFormField}
        value={store.signupForm.password}
        name="password"
      />
      <br />
      password check
      <br />
      <input
        type="password"
        onChange={store.updateSignupFormField}
        value={store.signupForm.passwordCheck}
        name="passwordCheck"
      />
      <br />
      <button type="submit">Signup</button>
      <button type="button" onClick={store.logout}>
        Logout
      </button>
    </form>
  );
}
