import authStore from "../stores/authStore";

export default function LoginForm() {
  const store = authStore();
  return (
    <form onSubmit={store.login}>
      email addresss
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
    </form>
  );
}
