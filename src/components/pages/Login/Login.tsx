import styles from "./Login.module.css";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import type { FormEvent } from "react";
import { login } from "../../../services/auth.service";
import { setLocalStorage } from "../../../utils/storage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const payload = {
      email: form.email.value,
      password: form.password.value,
    };
    const result = await login(payload);
    setLocalStorage("auth", result.token);

    return navigate("/orders");
  };
  return (
    <main className={styles.login}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <Input
            label="Email"
            id="email"
            type="email"
            name="email"
            placeholder="Insert Email"
            required
          />
          <Input
            label="Password"
            id="password"
            type="password"
            name="password"
            placeholder="Insert Password"
            required
          />
          <Button type="submit">Login</Button>
        </form>
      </div>
    </main>
  );
};

export default Login;
