import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
function Club() {
  const [searchParams, setSearchParams] = useSearchParams(); // Get a specific query parameter
  const ClubName = searchParams.get("clubname");
  const ClubDepartment = searchParams.get("dept");
  const Name = searchParams.get("name");
  const Pass = searchParams.get("pass");
  const Role = searchParams.get("role");

  const [clubInfo, setClubInfo] = useState({});

  //   setSearchParams({ ClubName: "myValue" }); // Remove a query parameter
  //   setSearchParams((params) => {
  //     params.delete("ClubName");
  //     return params;
  //   }); // ...

  useEffect(() => {
    const getInfo = async () => {
      //   console.log("i am running");
      console.log(ClubName, ClubDepartment, Name, Pass, Role);
      //   try {
      //     const response = await fetch("http://localhost:5000/api/info", {
      //       method: "POST",
      //       body: JSON.stringify({ name: Name, pass: Pass }),
      //     //   body: JSON.stringify({ name: Name, pass: Pass, role: Role, dept: ClubDepartment, clubname: ClubName }),
      //     });
      //     const jsonData = await response.json();
      //     console.log(jsonData);
      //   } catch (err) {
      //     console.error(err.message);
      //   }

      axios
        .post("http://localhost:5000/api/info", {
          name: Name,
          pass: Pass,
          role: Role,
          dept: ClubDepartment,
          clubname: ClubName,
        })
        .then((response) => setClubInfo(response.data))
        .catch((err) => console.log(err.response.data));
    };
    getInfo();
  }, []);
  return (
    <div>
      {ClubName}
      {ClubDepartment}
      {Name}
      {Pass}
      {JSON.stringify(clubInfo)}
    </div>
  );
}
export default Club;
