import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import {useState, useSyncExternalStore } from "react";
import styles from "./Login.module.css";

function Login() {
  const userName = localStorage.getItem("userName") || "null";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const[isLoading,setLoading]=useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { email, password };
    setLoading(true);
    try {
      const resp = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!resp.ok) {
        alert("Login failed!");
        return;
      }
      const result = await resp.json();
      console.log("Login successful:", result);
      localStorage.setItem("userName", result.data.user.username);
      localStorage.setItem("token", result.data.accessToken);
      navigate("/");
    } catch (err) {
      console.error("Error logging in:", err);
      alert("Try Again!");
    } finally {
      setLoading(false);  
    }
  }

  return (
    <>
      {isLoading && (
        <div className={styles.loaderOverlay}>
          <FadeLoader
            color={"#393535ff"}
            loading={isLoading}
            height={15}
            width={5}
            radius={2}
            margin={2}
          />
        </div>
      )}
      <div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.title}>Log In</h2>
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

          <span
            className={styles.createAccount}
            onClick={() => navigate("/")}
          >
            Go to Home
          </span>
        </form>
      </div>
    </>
  );
}

export default Login;