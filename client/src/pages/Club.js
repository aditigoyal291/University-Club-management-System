import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Club.css";

function Club() {
  const [searchParams, setSearchParams] = useSearchParams(); // Get a specific query parameter
  const ClubName = searchParams.get("clubname");
  const ClubDepartment = searchParams.get("dept");
  const Name = searchParams.get("name");
  const Pass = searchParams.get("pass");
  const Role = searchParams.get("role");

  const [clubInfo, setClubInfo] = useState({
    clubInfo: [],
    clubEvents: [],
    clubInfoMember: [],
  });
  const [page, setPage] = useState(1);
  const [eventInfo, setEventInfo] = useState({
    EventName: "",
    Venue: "",
    Date1: "",
    Budget: "",
    PrizeMoney: "",
    ClubName: ClubName,
  });

  const [memberInfo, setMemberInfo] = useState([]);

  useEffect(() => {
    const getInfoMember = async () => {
      // console.log(memberInfo);
      console.log("i am running");
      // console.log(MemberName, SRN, ClubName);
      axios
        .post("http://localhost:5000/api/post/showmember", {
          clubname: stateMember.ClubName,
        })
        .then((response) => {
          setMemberInfo(response.data);
          console.log(response.data);
        })
        .catch((err) => console.log(err.response.data));
    };
    getInfoMember();
  }, []);

  const [stateMember, setStateMember] = useState({
    MemberName: "",
    SRN: "",
    ClubName: ClubName,
  });

  const [stateDomain, setStateDomain] = useState({
    ClubName: ClubName,
    DomainName: "",
  });
  useEffect(() => {
    // console.log(stateMember);
    const getInfo = async () => {
      //   console.log("i am running");
      // console.log(MemberName, SRN, ClubName);
      axios
        .post("http://localhost:5000/api/info", {
          name: stateMember.MemberName,
          pass: stateMember.SRN,
          clubname: stateMember.ClubName,
        })
        .then((response) => {
          setClubInfo(response.data);
          console.log(response);
        })
        .catch((err) => console.log(err.response.data));
    };
    getInfo();
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      //   console.log("i am running");
      console.log(ClubName, ClubDepartment, Name, Pass, Role);
      axios
        .post("http://localhost:5000/api/info", {
          name: Name,
          pass: Pass,
          role: Role,
          dept: ClubDepartment,
          clubname: ClubName,
        })
        .then((response) => {
          setClubInfo(response.data);
          console.log(response.data);
        })
        .catch((err) => console.log(err.response.data));
    };
    getInfo();
  }, []);

  const handleEventSubmit = (e) => {
    e.preventDefault();

    if (
      !eventInfo.EventName ||
      !eventInfo.Venue ||
      !eventInfo.Date1 ||
      !eventInfo.Budget ||
      !eventInfo.PrizeMoney ||
      !eventInfo.ClubName
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    axios
      .post("http://localhost:5000/api/registerEvent", eventInfo)
      .then((response) => {
        toast.success("User added successfully");
        setEventInfo({
          EventName: "",
          Venue: "",
          Date1: "",
          Budget: "",
          PrizeMoney: "",
          ClubName: ClubName,
        });
      })
      .catch((err) => toast.error(err.response.data));
  };

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setEventInfo({ ...eventInfo, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log("running");
    setStateMember((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    console.log(stateMember);
  }, [stateMember]);

  const handleInputDomainChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log("running");
    setStateDomain((prev) => ({ ...stateDomain, [name]: value }));
  };
  useEffect(() => {
    console.log(stateDomain);
  }, [stateDomain]);

  const handleEventEdit = (event) => {
    setPage(3);
    setEventInfo({
      EventName: event.EventName,
      Venue: event.Venue,
      Date1: event.Date.split("T")[0],
      Budget: event.Budget,
      PrizeMoney: event.PrizeMoney,
      ClubName: ClubName,
    });
    console.log(event);
    console.log(eventInfo);
  };

  const handleEventUpdate = (eventInfo) => {
    const { EventName, Venue, Date1, Budget, PrizeMoney, ClubName } = eventInfo;

    if (!EventName || !Venue || !Date1 || !Budget || !PrizeMoney || !ClubName) {
      toast.error("Please fill in all fields");
      return;
    } else {
      axios
        .put(`http://localhost:5000/api/updateEvent`, eventInfo)
        .then((response) => {
          toast.success("User updated successfully");
        })
        .catch((err) => toast.error(err.response.data));
    }
  };

  const handleDomainSubmit = (e) => {
    e.preventDefault();

    if (!stateDomain.DomainName) {
      toast.error("Please fill in all fields");
      return;
    }

    axios
      .post("http://localhost:5000/api/registerdomain", stateDomain)
      .then((response) => {
        toast.success("User added successfully");
        setStateMember({
          DomainName: "",
          ClubName: ClubName,
        });
      })
      .catch((err) => toast.error(err.response.data));
  };

  const handleMemberSubmit = (e) => {
    e.preventDefault();

    if (!stateMember.MemberName || !stateMember.ClubName || !stateMember.SRN) {
      toast.error("Please fill in all fields");
      return;
    }

    axios
      .post("http://localhost:5000/api/registermember", stateMember)
      .then((response) => {
        toast.success("User added successfully");
        setStateMember({
          MemberName: "",
          SRN: "",
          ClubName: ClubName,
        });
      })
      .catch((err) => toast.error(err.response.data));
  };

  if (page === 1) {
    return (
      <>
        <div>
          {/* {Role==='ClubHead' &&
          <button
          onClick={() => {
            setPage(4);
          }}
          >
            {ClubName}
          </button>
          } */}
          <div class="navbar">
            {/* <div>{ClubDepartment}</div> */}
            <div id="namae">Hi, {Name}</div>
            {Role === "ClubHead" && <div class="depart">Club: {ClubName}</div>}
            {Role === "Admin" && (
              <div class="depart">Department: {ClubDepartment}</div>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {Role === "ClubHead" && (
              <button onClick={() => setPage(2)} class="btn">
                Add Event
              </button>
            )}
            {Role === "ClubHead" && (
              <button
                onClick={() => {
                  setPage(4);
                }}
                class="btn"
              >
                Add Domain
              </button>
            )}
            {Role === "ClubHead" && (
              <button
                onClick={() => {
                  setPage(5);
                }}
                class="btn"
              >
                Add members
              </button>
            )}
          </div>
          <br></br>

          <div id="cardsouter">
            {clubInfo.clubEvents.map((item) => (
              <>
                <div id="cards">
                  <div style={{ fontWeight: "bold", fontSize: "4rem" }}>
                    {item.ClubName}
                  </div>
                  <br />
                  <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    Event Name: {item.EventName}
                  </div>
                  <br />
                  <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    Venue: {item.Venue}
                  </div>
                  <br />
                  <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    Budget: {item.Budget}
                  </div>
                  <br />
                  <div style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                    Prize Money: {item.PrizeMoney}
                  </div>

                  <br />

                  <div>
                    {Role !== "Admin" && (
                      <button
                        onClick={() => handleEventEdit(item)}
                        class="buttons"
                      >
                        Edit Event
                      </button>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
          >
            <button
              onClick={() => {
                setPage(6);
              }}
              className="buttons"
            >
              Domains
            </button>
            <button
              onClick={() => {
                setPage(7);
              }}
              className="buttons"
            >
              Members
            </button>
          </div>
        </div>
      </>
    );
  } else if (page === 2) {
    return (
      <>
        {/* Page 2: Events Page */}
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              padding: "15px",
              maxWidth: "40rem",
              alignContent: "center",
            }}
            onSubmit={handleEventSubmit}
          >
            <label
              htmlFor="EventName"
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                fontWeight: "bold",
              }}
            >
              EventName
            </label>
            <input
              type="text"
              id="EventName"
              name="EventName"
              placeholder="Enter event name"
              value={eventInfo.EventName || ""}
              onChange={handleEventInputChange}
              style={{
                padding: "1rem",
                width: "20rem",
                borderRadius: "0.5rem",
              }}
            />
            <label
              htmlFor="Venue"
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Venue
            </label>
            <input
              type="text"
              id="Venue"
              name="Venue"
              placeholder="Enter Venue"
              value={eventInfo.Venue || ""}
              onChange={handleEventInputChange}
              style={{
                padding: "1rem",
                width: "20rem",
                borderRadius: "0.5rem",
              }}
            />
            <label
              htmlFor="Date1"
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Date
            </label>
            <input
              type="date"
              id="Date1"
              name="Date1"
              placeholder="Enter Date"
              value={eventInfo.Date1 || ""}
              onChange={handleEventInputChange}
              style={{
                padding: "1rem",
                width: "20rem",
                borderRadius: "0.5rem",
              }}
            />
            <label
              htmlFor="Budget"
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Budget
            </label>
            <input
              type="number"
              id="Budget"
              name="Budget"
              placeholder="Enter Budget"
              value={eventInfo.Budget || ""}
              onChange={handleEventInputChange}
              style={{
                padding: "1rem",
                width: "20rem",
                borderRadius: "0.5rem",
              }}
            />

            <label
              htmlFor="PrizeMoney"
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                fontWeight: "bold",
              }}
            >
              PrizeMoney
            </label>
            <input
              type="number"
              id="PrizeMoney"
              name="PrizeMoney"
              placeholder="Enter PrizeMoney"
              value={eventInfo.PrizeMoney || ""}
              onChange={handleEventInputChange}
              style={{
                padding: "1rem",
                width: "20rem",
                borderRadius: "0.5rem",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <input type="submit" value={"Save"} class="buttons" />

              <button onClick={() => setPage(1)} class="buttons">
                Go Back
              </button>
            </div>
          </form>
        </div>
      </>
    );
  } else if (page === 3) {
    return (
      <>
        page 3
        <div style={{ marginTop: "100px" }}>
          <form
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              alignContent: "center",
            }}
          >
            <label htmlFor="EventName">EventName</label>
            <input
              type="text"
              id="EventName"
              name="EventName"
              placeholder="Enter event name"
              disabled
              value={eventInfo.EventName || ""}
              onChange={handleEventInputChange}
            />
            <label htmlFor="Venue">Venue</label>
            <input
              type="text"
              id="Venue"
              name="Venue"
              placeholder="Enter Venue"
              value={eventInfo.Venue || ""}
              onChange={handleEventInputChange}
            />
            <label htmlFor="Date1">Date</label>
            <input
              type="date"
              id="Date1"
              name="Date1"
              placeholder="Enter Date"
              value={eventInfo.Date1 || ""}
              onChange={handleEventInputChange}
            />
            <label htmlFor="Budget">Budget</label>
            <input
              type="number"
              id="Budget"
              name="Budget"
              placeholder="Enter Budget"
              value={eventInfo.Budget || ""}
              onChange={handleEventInputChange}
            />

            <label htmlFor="PrizeMoney">PrizeMoney</label>
            <input
              type="number"
              id="PrizeMoney"
              name="PrizeMoney"
              placeholder="Enter PrizeMoney"
              value={eventInfo.PrizeMoney || ""}
              onChange={handleEventInputChange}
            />

            <button
              type="button"
              onClick={() => {
                handleEventUpdate(eventInfo);
              }}
            >
              Update
            </button>

            <button type="button" onClick={() => setPage(1)}>
              Go Back
            </button>
          </form>
        </div>
      </>
    );
  } else if (page === 4) {
    return (
      <>
        {/* page 4 */}
        {/* <br />
        {ClubName}
        <br />
        {JSON.stringify(memberInfo)}
        <button onClick={() => setPage(5)}>Add Members</button> */}
        {/* {JSON.stringify(stateMember)} */}
        <div style={{ marginTop: "100px" }}>
          <form
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              alignContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
            onSubmit={handleDomainSubmit}
          >
            <label
              htmlFor="DomainName"
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                fontWeight: "bold",
              }}
            >
              DomainName
            </label>
            <input
              type="text"
              id="DomainName"
              name="DomainName"
              placeholder="Enter Domain name"
              value={stateDomain.DomainName || ""}
              onChange={handleInputDomainChange}
              style={{
                padding: "1rem",
                width: "20rem",
                borderRadius: "0.5rem",
              }}
            />
            <br />
            <label
              htmlFor="ClubName"
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Club Name
            </label>
            <input
              type="text"
              id="ClubName"
              disabled
              name="ClubName"
              placeholder="Enter Club Name"
              value={stateDomain.ClubName}
              onChange={handleInputChange}
              style={{
                padding: "1rem",
                width: "20rem",
                borderRadius: "0.5rem",
              }}
            />
            <br />
            <div
              style={{
                display: "flex",
                padding: "2rem",
                gap: "2rem",
                marginTop: "1rem",
              }}
            >
              <input type="submit" value={"Save"} class="buttons" />
              <button onClick={() => setPage(1)} class="buttons">
                Go back
              </button>
            </div>
          </form>
        </div>
      </>
    );
  } else if (page === 5) {
    return (
      <>
        {/* page 5 */}
        <div style={{ marginTop: "100px" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              alignContent: "center",
            }}
            onSubmit={handleMemberSubmit}
          >
            <label
              htmlFor="MemberName"
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                fontWeight: "bold",
              }}
            >
              MemberName
            </label>
            <input
              type="text"
              id="MemberName"
              name="MemberName"
              placeholder="Enter Membr name"
              value={stateMember.MemberName || ""}
              onChange={handleInputChange}
              style={{
                padding: "1rem",
                width: "20rem",
                borderRadius: "0.5rem",
              }}
            />
            <label
              htmlFor="SRN"
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                fontWeight: "bold",
              }}
            >
              SRN
            </label>
            <input
              type="text"
              id="SRN"
              name="SRN"
              placeholder="Enter SRN"
              value={stateMember.SRN || ""}
              onChange={handleInputChange}
              style={{
                padding: "1rem",
                width: "20rem",
                borderRadius: "0.5rem",
              }}
            />

            <label
              htmlFor="ClubName"
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0.5rem",
                paddingTop: "0.5rem",
                fontWeight: "bold",
              }}
            >
              Club Name
            </label>
            <input
              type="text"
              id="ClubName"
              disabled
              name="ClubName"
              placeholder="Enter Club Name"
              value={stateMember.ClubName}
              onChange={handleInputChange}
              style={{
                padding: "1rem",
                width: "20rem",
                borderRadius: "0.5rem",
              }}
            />

            <br />
            <div
              style={{
                display: "flex",
                padding: "2rem",
                gap: "2rem",
                marginTop: "1rem",
              }}
            >
              <input type="submit" value={"Save"} class="buttons" />
              <button onClick={() => setPage(1)} class="buttons">
                Go back
              </button>
            </div>
          </form>
        </div>
      </>
    );
  } else if (page === 6) {
    return (
      <>
        <div className="domain-info">
          {clubInfo.clubInfo.map((items) => (
            <>
              {/* <div key={items.DomainName}>{items.DomainName}</div> */}
              <ul>
                <li>{items.DomainName}</li>
                {/* <li>{items.SRN}</li> */}
              </ul>
            </>
          ))}
        </div>
      </>
    );
  } else if (page === 7) {
    return (
      <>
        {clubInfo.clubInfoMember.map((items) => (
          <>
            <div >
              <ul className="domain-info">
                <li>{items.MemberName}</li>
                <li>{items.SRN}</li>
              </ul>
              <br />
            </div>
            {/* </div> */}
          </>
        ))}
      </>
    );
  }
}
export default Club;
