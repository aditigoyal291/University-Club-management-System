import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
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
    //   setTimeout(() => {});
  };

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setEventInfo({ ...eventInfo, [name]: value });
  };

  useEffect(() => {
    console.log(eventInfo);
  }, [eventInfo]);

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
    // e.preventDefault();
    const { EventName, Venue, Date1, Budget, PrizeMoney, ClubName } = eventInfo;

    if (!EventName || !Venue || !Date1 || !Budget || !PrizeMoney || !ClubName) {
      toast.error("Please fill in all fields");
      return;
    } else {
      axios
        .put(`http://localhost:5000/api/updateEvent`, eventInfo)
        .then((response) => {
          //   console.log(response);
          toast.success("User updated successfully");
          // setState({ ...state, [name]: value });
        })
        .catch((err) => toast.error(err.response.data));
      //   setTimeout(() => {});
    }
    // [eventInfo.EventName, eventInfo.Venue, eventInfo.Date1, eventInfo.Budget, eventInfo.PrizeMoney, eventInfo.ClubName] = [event.EventName, event.Venue, event.Date.split("T")[0], event.Budget, event.PrizeMoney, event.ClubName]
    // console.log(event);
  };
  if (page === 1) {
    return (
      <>
        <div>
          {ClubName}
          <br />
          {ClubDepartment}
          <br />
          {Name}
          <br />
          {Pass}
          <br />
          {JSON.stringify(clubInfo)}
          {/* {JSON.stringify(clubInfo.clubEvents)} */}
          {Role === "ClubHead" && (
            <button onClick={() => setPage(2)}>Add Event</button>
          )}

          {/* {Role === "Admin" && (
            <>
              {clubInfo.clubInfo.map((club) => (
                <>
                {JSON.stringify(club)}
                </>
              ))}
            </>
          )} */}
          <></>
        </div>

        <div>
          {clubInfo.clubEvents.map((event) => (
            <div key={event.EventID}>
              {/* {event.EventName} {event.Date} */}
              {Role !== "Admin" && (
                <button onClick={() => handleEventEdit(event)}>
                  Edit Event
                </button>
              )}
            </div>
          ))}
        </div>
      </>
    );
  } else if (page === 2) {
    return (
      <>
        Page 2: Events Page
        <div style={{ marginTop: "100px" }}>
          <form
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              alignContent: "center",
            }}
            onSubmit={handleEventSubmit}
          >
            <label htmlFor="EventName">EventName</label>
            <input
              type="text"
              id="EventName"
              name="EventName"
              placeholder="Enter event name"
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

            <input type="submit" value={"Save"} />

            <button onClick={() => setPage(1)}>Go Back</button>
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
  } else {
    return <>page 4</>;
  }
}
export default Club;
