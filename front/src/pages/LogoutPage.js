import { useEffect } from "react";
import authStore from "../stores/authStore";

function LogoutPage() {
  // When entering this page, just call logout
  const store = authStore();
  useEffect(() => {
    store.logout();
  }, []);

  // Print logout message
  return <h1>You are now logged out!</h1>;
}

export default LogoutPage;
