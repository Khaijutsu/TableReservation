import "./home.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const Home = () => {
  return (
    <div>
      <div>
        <img src="/homeBG.jpg" alt="" className="home-img" />
      </div>

      <div className="home-form">
        <h1>Welcome to WcDonald Restaurant</h1>
        <Link to="/reserve-table">
          <button class="btn btn-primary">Reserve A Table</button>
        </Link>
        
        <div className="user-link">
          <Link to="/register-user">
            <button className="mr">Sign Up</button>
          </Link>
          
          <Link to="/login">
            <button className="ml">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
