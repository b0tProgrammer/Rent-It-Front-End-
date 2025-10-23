import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import styles from "./Login.module.css";

function Login() {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userName = decodedToken ? decodedToken.sub : "null";

  if (userName !== "null") {
    window.location.href = "/";
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Logging in ${name}`);
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Log In</h2>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>

        <span
          className={styles.createAccount}
          onClick={() => navigate("/signIn")}
        >
          Create Account?
        </span>
      </form>
    </div>
  );
}

export default Login;
