import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const addUser = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/auth/register", {
      username: userName,
      email: email,
      password: password,
    });
    navigate("/");
  };




  return (
    <div>
      <div>
        <Link to="/">Home Page</Link>
      </div>
      <div className="container info-fill-in">
        <form onSubmit={addUser}>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={(e) => {setUserName(e.target.value)}}
            required
            className="form-control mb-3"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            onChange={(e) => {setEmail(e.target.value)}}
            required
            className="form-control mb-3"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={(e) => {setPassword(e.target.value)}}
            required
            className="form-control mb-3"
          />
         
          <button>Submit</button>
        
          
        </form>
        
      </div>
    </div>
  );
};

export default Signup;