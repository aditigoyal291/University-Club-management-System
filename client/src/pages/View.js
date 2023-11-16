import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((response) => {
      setUser({ ...response.data[0] });
    });
  }, [id]);
  return (
    <div style={{ marginTop: "150px" }}>
      <h1>User Details</h1>
      <h3>UserID: {user.UserID}</h3>
      <h3>Username: {user.Username}</h3>
      <h3>Password: {user.Password}</h3>
      <h3>Role: {user.Role}</h3>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button>Back</button>
      </Link>
    </div>
  );
};

export default View;
