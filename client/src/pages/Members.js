import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  MemberName: "",
  SRN: "",
  ClubName: "",
};

const Members = () => {
  const [stateMember, setStateMember] = useState(initialState);
  const { MemberName, SRN, ClubName } = stateMember;

  //   const history = useHistory();

  useEffect(() => {
    console.log(stateMember);
  }, [stateMember]);

  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((response) => {
      setStateMember({ ...response.data[0] });
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { MemberName, SRN, ClubName } = stateMember;

    if (!MemberName || !SRN || !ClubName) {
      toast.error("Please fill in all fields");
      return;
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/registermember", stateMember)
          .then((response) => {
            //   console.log(response);
            toast.success("User added successfully");
            setStateMember({
              MemberName: "",
              SRN: "",

              ClubName: "",
            });
            // setState({ ...state, [name]: value });
          })
          .catch((err) => toast.error(err.response.data));
        //   setTimeout(() => {});
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, stateMember)
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
    // console.log(name, value)
    setStateMember({ ...stateMember, [name]: value });
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
        <label htmlFor="MemberName">MemberName</label>
        <input
          type="text"
          id="MemberName"
          name="MemberName"
          placeholder="Enter Membr name"
          value={MemberName || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="SRN">SRN</label>
        <input
          type="text"
          id="SRN"
          name="SRN"
          placeholder="Enter SRN"
          value={SRN || ""}
          onChange={handleInputChange}
        />
        
        <label htmlFor="ClubName">Club Name</label>
        <input
          type="text"
          id="ClubName"
          name="ClubName"
          placeholder="Enter Club Name"
          value={ClubName || ""}
          onChange={handleInputChange}
        />

        {/* <label htmlFor="ClubName">Club</label>
        <select
          name="ClubName"
          id="ClubName"
          value={stateEvent.ClubName}
          onChange={handleInputChange}
        >
          <option value="">Select Club</option>
          <option value="WEAL">WEAL</option>
          <option value="NEXUS">NEXUS</option>
          <option value="Shunya">Shunya</option>
          <option value="Aikya">Aikya</option>
        </select> */}
        {/* {Role === "ClubHead" ? (
          <>
            <label htmlFor="ClubName">CLubName</label>
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
            <label htmlFor="ClubDepartment">Department</label>
            <select
              name="ClubDepartment"
              id="ClubDepartment"
              value={ClubDepartment}
              onChange={handleInputChange}
            >
              <option value="CSE">CSE</option>
              <option value="Misc.">Misc.</option>
            </select>
          </>
        ) : null} */}
        <br />
        <input type="submit" value={id ? "Update" : "Save"} />

        <Link to="/">
          <input type="button" value="Go back" />
        </Link>
      </form>
    </div>
  );
};

export default Members;
