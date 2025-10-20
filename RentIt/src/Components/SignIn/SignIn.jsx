

function signIn() {
    return (
        <>
            <div>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </>
    )
}

export default signIn;