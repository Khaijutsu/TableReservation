import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const Home = () => {
  const [credentials, setCredentials] = useState({
    username:undefined,
    password:undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick= async (e) => {
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try {
      const res = await axios.post("http://localhost:4000/auth/login", credentials);
      dispatch({type:"LOGIN_SUCCESS", payload: res.data});
      navigate("/reserve-table")
    } catch(err) {
      dispatch({type:"LOGIN_FAILURE", payload:err.response.data});
    }
  };

 

  return (
    <div>
      <div>
        <img src="/homeBG.jpg" alt="" className="home-img"/>
      </div>
      
      <div className='home-form'>
        <form>
          <h1>Welcome to Nippon Restaurant</h1>
          <div className="login">
            <input type="text" class="form-control" placeholder="username" id="username" onChange={handleChange} className="input"/>
            <input type="password" class="form-control" placeholder="password" id="password" onChange={handleChange} className="input"/>
            <button disabled={loading} type="submit" class="btn btn-primary" onClick={handleClick}>Login</button>
            {error && <span>{error.message}</span>}
          </div>
          
        </form>

        <div className="guest-link">
          <Link to="/reserve-table">Continue as Guest</Link>
        </div>

        <Link to="/register-user">Register</Link>
      </div>
    </div>
  )
}

export default Home