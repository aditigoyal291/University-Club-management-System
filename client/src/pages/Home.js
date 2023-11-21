import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
const Home = () => {
  const [clubEventInfo, setClubEventInfo] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/adminClubInfo");
        const data = await response.data;
        setClubEventInfo(data);

        // Handle successful response

        setError(null);
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
        setError("Error fetching data from the server");
        setClubEventInfo(null);
      }
    };

    fetchData();
  }, []);
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
        {JSON.stringify(clubEventInfo)}
        {/* <button onClick={fetchData}>Fetch Data</button>{" "} */}
        {/* Example button to trigger API call */}
        <h1>Club and Event Information</h1>
        {error && <p>{error}</p>}
        {clubEventInfo && (
          <div>
            <p>Total Distinct Clubs: {clubEventInfo[0].TotalDistinctClubs}</p>
            <p>Total Events: {clubEventInfo[0].TotalEvents}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
