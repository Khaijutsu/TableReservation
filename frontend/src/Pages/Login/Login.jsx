import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:4000/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/reserve-table");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div>
      <div className="login">
        <h4>Login</h4>
        <form>
          <label>Username</label>
          <input
            type="text"
            id="username"
            onChange={handleChange}
            className="form-control mb-3"
          />
          <label>Password</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            className="form-control mb-3"
          />
          <button
            disabled={loading}
            class="btn btn-primary"
            onClick={handleClick}
          >
            Login
          </button>
          {error && <span>{error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
