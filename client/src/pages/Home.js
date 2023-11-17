import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  return (
    <>
      <div className="main-div">
        <h1>Home</h1>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>SignUp</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
