import { useEffect } from "react";
import authStore from "../stores/authStore";
import styles from "../styles.module.css";

function LogoutPage() {
  // When entering this page, just call logout
  const store = authStore();
  useEffect(() => {
    store.logout();
  }, []);

  // Print logout message
  return (
    <div className={styles.page}>
      <h1>You are now logged out!</h1>
    </div>
  );
}

export default LogoutPage;
