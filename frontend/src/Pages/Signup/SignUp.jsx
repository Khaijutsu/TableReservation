import "./signup.css";
import { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";


const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const addUser = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:4000/auth/register", {
        username: userName,
        email: email,
        password: password,
    });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div>
      <div className="signup">
        <h4>Sign Up</h4>
        <form onSubmit={addUser}>
          <label>Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUserName(e.target.value)}
            required
            className="form-control mb-3"
          />
          <label>Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control mb-3"
          />
          <label>Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control mb-3"
          />
           <button
            disabled={loading}
            class="btn btn-primary"
           >Sign Up</button>  
           <br />
           {error && <span>{error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default Signup;