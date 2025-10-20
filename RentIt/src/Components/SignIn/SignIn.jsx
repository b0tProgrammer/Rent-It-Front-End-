import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FadeLoader } from "react-spinners";
import styles from "./SignIn.module.css";

function SignIn() {
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userName = decodedToken ? decodedToken.sub : "null";

  if (userName !== "null") {
    window.location.href = "/";
  }

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Account created for ${username}`);
      window.location.href = "/";
    }, 2000);
  }

  return (
    <>
      {isLoading && (
        <div className={styles.loaderOverlay}>
          <FadeLoader
            color={"#ccccccff"}
            loading={isLoading}
            height={15}
            width={5}
            radius={2}
            margin={2}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
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
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>
    </>
  );
}

export default SignIn;
