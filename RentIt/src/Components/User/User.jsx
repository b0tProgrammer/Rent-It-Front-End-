function User() {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName") || "null";
    if(token === null || userName === "null"){
        window.location.href = '/login';
        return;
    }
    return (
        <>
            <div>
                <h1>Welcome, {userName}!</h1>
                <p>This is your user dashboard.</p>
                <button onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("userName");
                    window.location.href = '/login';
                }}>Log Out</button>
            </div>
        </>
    )
}

export default User;