import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles.module.css";
import authStore from "../stores/authStore";

export default function Navbar() {
  const store = authStore();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/create">글쓰기</Link>
        </li>
        {store.loggedIn && (
          <>
            <li>
              <Link to="/logout">로그아웃</Link>
            </li>
          </>
        )}
        {!store.loggedIn && (
          <>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
