import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  EventName: "",
  Venue: "",
  Date1: "",
  Budget: "",
  PrizeMoney: "",
  ClubName: "",
};

const Events = () => {
  const [stateEvent, setStateEvent] = useState(initialState);
  const { EventName, Venue, Date1, Budget, PrizeMoney, ClubName } = stateEvent;

  //   const history = useHistory();

  useEffect(() => {
    console.log(stateEvent);
  }, [stateEvent]);

  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((response) => {
      setStateEvent({ ...response.data[0] });
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { EventName, Venue, Date1, Budget, PrizeMoney, ClubName } =
      stateEvent;

    if (!EventName || !Venue || !Date1 || !Budget || !PrizeMoney || !ClubName) {
      toast.error("Please fill in all fields");
      return;
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/registerEvent", stateEvent)
          .then((response) => {
            //   console.log(response);
            toast.success("User added successfully");
            setStateEvent({
              EventName: "",
              Venue: "",
              Date1: "",
              Budget: "",
              PrizeMoney: "",
              ClubName: "",
            });
            // setState({ ...state, [name]: value });
          })
          .catch((err) => toast.error(err.response.data));
        //   setTimeout(() => {});
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, stateEvent)
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
    setStateEvent({ ...stateEvent, [name]: value });
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
        <label htmlFor="EventName">EventName</label>
        <input
          type="text"
          id="EventName"
          name="EventName"
          placeholder="Enter event name"
          value={EventName || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="Venue">Venue</label>
        <input
          type="text"
          id="Venue"
          name="Venue"
          placeholder="Enter Venue"
          value={Venue || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="Date1">Date</label>
        <input
          type="date"
          id="Date1"
          name="Date1"
          placeholder="Enter Date"
          value={Date1 || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="Budget">Budget</label>
        <input
          type="number"
          id="Budget"
          name="Budget"
          placeholder="Enter Budget"
          value={Budget || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="PrizeMoney">PrizeMoney</label>
        <input
          type="number"
          id="PrizeMoney"
          name="PrizeMoney"
          placeholder="Enter PrizeMoney"
          value={PrizeMoney || ""}
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

export default Events;
