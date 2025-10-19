
function Header() {

    var token = localStorage.getItem("token");
    if(!token) console.log("no token");

    return (
        <>
            <div>
                <img src="null" alt="RentIt Logo" />
                <input type="text" placeholder="Search for products..." />
                <button>Search</button>
                <span onClick={() => console.log("Hi!")}>Login</span>
                <button>Give Rent</button>
            </div>
        </>
    );
}

export default Header;