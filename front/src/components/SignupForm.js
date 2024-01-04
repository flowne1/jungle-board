import { useNavigate } from "react-router-dom";
import authStore from "../stores/authStore";
import styles from "../styles.module.css";

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
    <form className={styles.inputForm} onSubmit={handleSignup}>
      <span className={styles.formTitle}>회원가입</span>
      <span className={styles.formTitle2}>email address</span>
      <input
        className={styles.inputSignup}
        type="email"
        onChange={store.updateSignupFormField}
        value={store.signupForm.email}
        name="email"
      />
      <span className={styles.formTitle2}>password</span>
      <input
        className={styles.inputSignup}
        type="password"
        onChange={store.updateSignupFormField}
        value={store.signupForm.password}
        name="password"
      />
      <span className={styles.formTitle2}>password check</span>
      <input
        className={styles.inputSignup}
        type="password"
        onChange={store.updateSignupFormField}
        value={store.signupForm.passwordCheck}
        name="passwordCheck"
      />
      <br />
      <button className={styles.buttonSubmit} type="submit">
        Signup
      </button>
    </form>
  );
}
