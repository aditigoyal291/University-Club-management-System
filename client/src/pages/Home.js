import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Home.css";
import Logo from "./club.png"
import second from "./1.png"
const Home = () => {
  return (
    <body>
      <div id="outerdiv">
        <div id="navbar"> 
        <img src={Logo} id="logo"></img>
        <p>UCMS</p>
        <Link to="/login">
          <button class="button">Login</button>
        </Link>
        <Link to="/signup">
          <button class="button">SignUp</button>
        </Link>
        </div>
        <div>

        </div>
        <img src={second} id="sec"></img>
      </div>

    </body>
  );
};

export default Home;
