import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./signup.css";
import axios from "axios";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const addUser = () => {
    axios.post("http://localhost:4000/auth/register", {
      username: userName,
      email: email,
      password: password,
    });
  };
  return (
    <div>
      <div>
        <Link to="/">Home Page</Link>
      </div>
      <div className="container info-fill-in">
        <form >
          <input
            type="text"
            placeholder="username"
            onChange={(e) => {setUserName(e.target.value)}}
            className="form-control mb-3"
          />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => {setEmail(e.target.value)}}
            className="form-control mb-3"
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {setPassword(e.target.value)}}
            className="form-control mb-3"
          />
          
        </form>
        <Link to="/">
          <button onClick={addUser}>Submit</button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;