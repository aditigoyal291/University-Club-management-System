import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), //body receives data in json format from req.body 
      });

      const data = await response.json()
      console.log(data)

      if (response.status === 200) {
        toast.success("Login successful");
        
        if (data.Role === "Admin") {
          window.location.href = `/club?name=${data.Username}&pass=${data.Password}&role=${data.Role}&dept=${data.ClubDepartment}`;
        } else {
          window.location.href = `/club?name=${data.Username}&pass=${data.Password}&role=${data.Role}&clubname=${data.ClubName}`;
        }
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div id="outerdiv">
      {/* <h1>login page</h1> */}
      <h1 id="heading">Login</h1>
      <h2>
        Wanna catch up with the latest activities in college? We got you!!!
      </h2>
      <div id="cover">
        <form id="form">
          {/* <label for="username">Username:</label> */}
          <input
            type="text"
            className="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
          <input
            type="password"
            className="username"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>

          <button id="button" onClick={handleLogin} type="submit">
            Login
          </button>
          <h3 id="h3">Don't have an account? <Link to='/signup'>Sign Up</Link></h3>
        </form>
      </div>
    </div>
  );
};

export default Login;
