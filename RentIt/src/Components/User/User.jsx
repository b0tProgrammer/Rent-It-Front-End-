import { jwtDecode } from "jwt-decode";

function User() {
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const userName = decodedToken ? decodedToken.sub : 'null';
    if(userName === 'null'){
        window.location.href = '/login';
    }
    return (
        <>
            <div>
                <h1>Welcome, {userName}!</h1>
                <p>This is your user dashboard.</p>
            </div>
        </>
    )
}

export default User;