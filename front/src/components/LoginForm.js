import { useNavigate } from "react-router-dom";
import authStore from "../stores/authStore";
import styles from "../styles.module.css";

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
    <form className={styles.inputForm} onSubmit={handleLogin}>
      <span className={styles.formTitle}>로그인</span>
      <span>이메일과 비밀번호를 입력하세요</span>
      {/* <span className={styles.formTitle2}>email address</span> */}
      <input
        className={styles.inputLogin}
        type="email"
        onChange={store.updateLoginFormField}
        value={store.loginForm.email}
        name="email"
        placeholder="이메일"
      />
      {/* <span className={styles.formTitle2}>password</span> */}
      <input
        className={styles.inputLogin}
        type="password"
        onChange={store.updateLoginFormField}
        value={store.loginForm.password}
        name="password"
        placeholder="패스워드"
      />
      <div>
        <button className={styles.buttonLogin} type="submit">
          로그인
        </button>
      </div>
    </form>
  );
}
