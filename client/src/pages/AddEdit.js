import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link, useFetcher } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialState = {
  Username: "",
  Password: "",
  Role: "",
  ClubName: "",
  ClubDepartment: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { ClubName, ClubDepartment, Username, Password, Role } = state;

  useEffect(() => {
    console.log(state);
  }, [state]);

  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((response) => {
      console.log(response.data[0]);
      setState({ ...response.data[0] });
    });
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Role);
    if (!Username || !Password || !Role) {
      toast.error("Please fill in all fields");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", state)
          .then((response) => {
            //   console.log(response);
            toast.success("User added successfully");
            // setState({ ...state, [name]: value });
          })
          .catch((err) => toast.error(err.response.data));
        //   setTimeout(() => {});
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, state)
          .then((response) => {
            //   console.log(response);
            toast.success("User updated successfully");
            // setState({ ...state, [name]: value });
          })
          .catch((err) => toast.error(err.response.data));
        //   setTimeout(() => {});
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("running");
    // console.log(name, value)
    setState({ ...state, [name]: value });
  };

  return (
    <div id="outerdiv">
    <h1 id="heading">SignUp</h1>
      <h2>
        Wanna catch up with the latest activities in college? We got you!!!
      </h2>
    <div id="cover">
      <form id="form" onSubmit={handleSubmit}>
        <label htmlFor="username"></label>
        <input
          type="text"
          class="username"
          name="Username"
          placeholder="Enter name"
          value={Username || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="password"></label>
        <input
          type="text"
          class="password"
          name="Password"
          placeholder="Enter Password"
          value={Password || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="role"></label>
        <input
          type="text"
          class="role"
          name="Role"
          placeholder="Enter Role"
          value={Role || ""}
          onChange={handleInputChange}
        />
        {Role === "ClubHead" ? (
          <>
            <label htmlFor="ClubName">ClubName</label>
            <select
              name="ClubName"
              id="ClubName"
              value={ClubName}
              onChange={handleInputChange}
            >
              <option value="WEAL">WEAL</option>
              <option value="NEXUS">NEXUS</option>
              <option value="Shunya">Shunya</option>
              <option value="Aikya">Aikya</option>
              <option value="Embrione">Embrione</option>
            </select>
          </>
        ) : Role === "Admin" ? (
          <>
            <label htmlFor="ClubDepartment" style={{fontSize:"2rem"}}>Department</label>
            <select
              name="ClubDepartment"
              id="ClubDepartment"
              style={{width:"22rem",padding:"1rem",borderRadius:"0.5rem"}}
              value={ClubDepartment}
              onChange={handleInputChange}
            >
              <option value="CSE">CSE</option>
              <option value="Misc.">Misc.</option>
            </select>
          </>
        ) : null}
        <br />
        <input type="submit" class="button" value={id ? "Update" : "Save"} />

        <Link to="/">
          <input type="button" class="button" value="Go back" />
        </Link>
      </form>
    </div>
    </div>
  );
};

export default AddEdit;
