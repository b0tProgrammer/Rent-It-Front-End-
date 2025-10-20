import { useNavigate } from "react-router-dom";
import signIn from "../SignIn/SignIn";
function Login() {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Log In</button>
                    <span onClick={() => navigate("/signIn")}>Create Account?</span>
                </form>
            </div>
        </>
    );
}

export default Login;