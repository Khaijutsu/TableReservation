import { useContext } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"
import { useLogout } from "../../hooks/useLogout";
import "./navbar.css";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();
  const handleClick = () => {
    logout()
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none"}}>
          <span className="logo">Nippon</span>
        </Link>
        {user ? <div>
          {user.username}
          <button onClick={handleClick} className="button-margin">Log out</button>
          </div> : (
          <div className="navItems">
            <Link to="/register-user"><button className="navButton">Sign Up</button></Link>
            <Link to="/login"><button className="navButton">Login</button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar