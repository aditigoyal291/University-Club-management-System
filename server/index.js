// import { v4 as uuidv4 } from "uuid";
// uuidv4();
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const mysql = require("mysql2");
const cors = require("cors");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "adi93066",
  database: "ucms_proj",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM users";
  db.query(sqlGet, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.post("/api/post", async (req, res) => {
  let { Username, Password, Role, ClubName, ClubDepartment } = await req.body;

  Role === "Admin" ? (ClubName = null) : (ClubDepartment = null);
  const UserID = uuidv4();

  const sqlInsert =
    "INSERT INTO users (UserID,  UserName, Password, Role,  ClubName, ClubDepartment) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [UserID, Username, Password, Role, ClubName, ClubDepartment],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error inserting values");
      } else {
        console.log("Values Inserted");
        res.send("Values Inserted");
      }
    }
  );
});

// Assuming you have a Clubs table with a structure similar to this
// CREATE TABLE Clubs (
//   ClubID INT AUTO_INCREMENT PRIMARY KEY,
//   ClubName VARCHAR(255) UNIQUE
// );

app.post("/api/registerEvent", (req, res) => {
  console.log(req.body);
  const { ClubName, EventName, Venue, Date1, Budget, PrizeMoney } = req.body;

  // Generate a unique EventID using UUID
  const EventID = uuidv4();

  const sqlEvent = `
    INSERT INTO Events (EventID, ClubName, EventName, Venue, Date, Budget, PrizeMoney)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sqlEvent,
    [EventID, ClubName, EventName, Venue, Date1, Budget, PrizeMoney],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error registering event");
      } else {
        res.status(200).send("Event registered successfully");
      }
    }
  );
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Example query to check login credentials
  const sqlLogin = `SELECT * FROM Users WHERE Username = ? AND Password = ?`;

  // Assuming you have a hashed password stored in the database
  // You may need to hash the password provided in the request before comparing

  db.query(sqlLogin, [username, password], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      if (result.length > 0) {
        console.log(result[0]);
        // console.log(result[0].UserID)
        // Login successful
        res.status(200).send(result[0]);
      } else {
        // Incorrect username or password
        res.status(401).send("Invalid credentials");
      }
    }
  });
});
// app.get("/", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO users (UserId,UserName, Password, Role) VALUES ('1','adiish', 'adi1234', 'Admin')";
//   db.query(sqlInsert, (err, result) => {
//     if (err) {
//       res.status(500).send(err );
//     } else {
//       console.log("Inserted a new user into the 'users' table.");
//       res.send("Inserted a new user into the 'users' table.");
//     }
//   });
// });

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM users WHERE UserID = ?";
  db.query(sqlRemove, id, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM users WHERE UserID = ?";
  db.query(sqlGet, id, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { Username, Password, Role } = req.body;
  const sqlUpdate =
    "UPDATE users SET Username = ?, Password = ?, Role = ? WHERE UserID = ?";

  db.query(sqlUpdate, [Username, Password, Role, id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
app.put("/api/updateEvent", (req, res) => {
  // const { id } = req.params;
  const { EventName, Budget, Date1, Venue, PrizeMoney } = req.body;
  const sqlUpdate =
    "UPDATE events set Budget=?,Date=?, Venue=?, PrizeMoney=? where EventName=?";

  db.query(
    sqlUpdate,
    [Budget, Date1, Venue, PrizeMoney, EventName],
    (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.post("/api/info", (req, res) => {
  const { name, pass, role, dept, clubname } = req.body;
  console.log(name, pass, role, dept, clubname);

  let clubInformation = {
    clubInfo: [],
    clubEvents: [],
  };

  if (role === "Admin") {
    const sqlAdmin =
      "SELECT c.*, u.* FROM users u JOIN clubs c ON u.ClubDepartment = c.Dept where u.Username=? and u.Password=?;";
    const sqlEvents =
      "SELECT e.* FROM Events e JOIN Clubs c ON e.ClubName = c.ClubName WHERE c.Dept = ?;";

    db.query(sqlAdmin, [name, pass], (err, result) => {
      if (err) console.log(err);
      else {
        clubInformation.clubInfo = result;
        console.log(result);
      }
    });
    db.query(sqlEvents, [dept], (err, result) => {
      if (err) console.log(err);
      else {
        clubInformation.clubEvents = result;
        // console.log(clubInformation);
        res.send(clubInformation);
      }
    });
  } else {
    const sqlHead =
      "SELECT c.*, u.* FROM users u JOIN clubs c ON u.ClubName = c.ClubName where u.Username=? and u.Password=?;";
    const sqlEvents = "SELECT * FROM events WHERE ClubName =?;";

    db.query(sqlHead, [name, pass], (err, result) => {
      if (err) console.log(err);
      else {
        clubInformation.clubInfo = result;
        // console.log(clubInformation);
      }
    });
    db.query(sqlEvents, [clubname], (err, result) => {
      if (err) console.log(err);
      else {
        clubInformation.clubEvents = result;
        // console.log(clubInformation);
        res.send(clubInformation);
      }
    });
  }
});

// const createTriggerQuery = `
//     CREATE TRIGGER auto_assign_department
//     BEFORE INSERT ON Clubs
//     FOR EACH ROW
//     BEGIN
//         DECLARE club_department VARCHAR(255);

//         SELECT DomainName INTO club_department
//         FROM Domain
//         WHERE ClubID = NEW.ClubID;

//         IF club_department = 'CSE' THEN
//             SET NEW.Dept = 'CSE';
//         ELSEIF club_department = 'AIML' THEN
//             SET NEW.Dept = 'AIML';
//         ELSE
//             SET NEW.Dept = 'Misc.';
//         END IF;
//     END;
// `;

// db.query(createTriggerQuery, (err, result) => {
//   if (err) {
//     console.error("Error creating trigger:", err);
//   } else {
//     console.log("Trigger created successfully");
//   }
// });

const createTriggerQuery = `

CREATE TRIGGER enforce_role_assignment
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
    IF NEW.Role NOT IN ('Admin', 'ClubHead') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid role assignment';
    END IF;
END;
`;

db.query(
  `DROP TRIGGER IF EXISTS enforce_role_assignment`,
  (dropErr, dropResult) => {
    if (dropErr) {
      console.error("Error dropping trigger:", dropErr);
    } else {
      // Trigger dropped successfully or not present, proceed to create
      db.query(createTriggerQuery, (createErr, createResult) => {
        if (createErr) {
          console.error("Error creating trigger:", createErr);
        } else {
          console.log("Trigger created successfully");
        }
      });
    }
  }
);


 

const createFunctionQuery = `


CREATE FUNCTION CalculateTotalBudgetByEventName(EventName VARCHAR(255))
RETURNS DECIMAL(10, 2)
READS SQL DATA
BEGIN
    DECLARE total_budget DECIMAL(10, 2);

    SELECT SUM(Budget) INTO total_budget
    FROM Events
    WHERE EventName = EventName;

    RETURN total_budget;
END;

`;

// Drop the existing function if it exists
db.query(`DROP FUNCTION IF EXISTS CalculateTotalBudgetByEventName;`, (err, result) => {
if (err) {
  console.error("Error dropping function:", err);
} else {
  // Proceed to create the function after dropping (if it existed)
  db.query(createFunctionQuery, (createErr, createResult) => {
    if (createErr) {
      console.error("Error creating function:", createErr);
    } else {
      console.log("Function created successfully");
    }
  });
}
});


app.listen(5000, () => {
  console.log("server is running");
});
