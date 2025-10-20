import {useNavigate} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Header() {
    const navigate = useNavigate();
    var token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
  const userName = decodedToken ? decodedToken.sub : 'Enter';
    return (
        <>
            <div>
                <img src="null" alt="RentIt Logo" />
                <input type="text" placeholder="Search for products..." />
                <button>Search</button>
                <span 
                    onClick={ () => 
                        {
                            if(userName === 'Enter'){
                                navigate('/login');
                            } else {
                                navigate('/');
                            }
                        }
                    }   
                >Login</span>
                <button>Give Rent</button>
            </div>
        </>
    );
}

export default Header;