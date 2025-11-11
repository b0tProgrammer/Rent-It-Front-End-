import { useState } from "react";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css"

function SignIn() {
  const userName = localStorage.getItem("userName") || "null";
  const navigate = useNavigate();
  if (userName !== "null") {
    window.location.href = "/";
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please re-enter.");
      return;
    }
    setIsLoading(true);
    try {
      const resp = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username:name , email, password, phone:phoneNumber }),
      });
      if (!resp.ok) {
        alert("Sign In failed!");
        return;
      }
      const result = await resp.json();
      console.log("Sign In successful:", result);
      navigate("/login");
    } catch (err) {
      console.error("Error Sign in:", err);
      alert("Try Again!");
    } finally {
      setIsLoading(false);  
    }
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
          placeholder="User name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
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
        <span
            className={styles.createAccount}
            onClick={() => navigate("/")}
          >
            Go to Home
          </span>
      </form>
    </>
  );
}

export default SignIn;