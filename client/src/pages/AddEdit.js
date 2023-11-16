import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link, useFetcher } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  UserID: "",
  Username: "",
  Password: "",
  Role: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { UserID, Username, Password, Role } = state;
  //   const history = useHistory();

  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((response) => {
      setState({ ...response.data[0] });
    });
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!UserID || !Username || !Password || !Role) {
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
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="userid">UserId</label>
        <input
          type="text"
          id="userid"
          name="UserID"
          placeholder="Enter UserID"
          value={UserID || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="Username"
          placeholder="Enter name"
          value={Username || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="Password"
          placeholder="Enter Password"
          value={Password || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="role">Role</label>
        <input
          type="text"
          id="role"
          name="Role"
          placeholder="Enter role"
          value={Role || ""}
          onChange={handleInputChange}
        />
        <input type="Submit" value={id ? "Update" : "Save"} />

        <Link to="/">
          <input type="button" value="Go back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
