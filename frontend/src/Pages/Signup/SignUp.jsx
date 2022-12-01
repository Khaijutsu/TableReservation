import "./signup.css";
import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mailingAddress, setMailingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const addUser = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      await axios.post("http://localhost:4000/auth/register", {
        username: userName,
        email: email,
        password: password,
        mailingAddress: mailingAddress,
        billingAddress: billingAddress,
        paymentMethod: paymentMethod,
      });
      dispatch({ type: "LOGIN_SUCCESS" });
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
          <label>Mailing Address</label>
          <input
            type="text"
            id="mailingAddress"
            onChange={(e) => setMailingAddress(e.target.value)}
            required
            className="form-control mb-3"
          />
          <label>Billing Address</label>
          <input
            type="text"
            id="billingAddress"
            onChange={(e) => setBillingAddress(e.target.value)}
            required
            className="form-control mb-3"
          />
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            id="paymentMethod"
            onClick={(e) => setPaymentMethod(e.target.value)}
            required
            className="m-2"
          >
            <option disabled selected value></option>
            <option value="cash">cash</option>
            <option value="credit">credit</option>
            <option value="check">check</option>
          </select>
          <br />

          <button disabled={loading} class="btn btn-primary">
            Sign Up
          </button>
          <br />
          {error && <span>{error.message}</span>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
