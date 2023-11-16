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
  const { Username, Password, Role } = await req.body;
  console.log(req.body);
  const UserID = uuidv4();
  console.log(UserID, req.body);
  const sqlInsert =
    "INSERT INTO users (UserID,  UserName, Password, Role) VALUES (?,?,?,?)";
  db.query(sqlInsert, [UserID, Username, Password, Role], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error inserting values");
    } else {
      console.log("Values Inserted");
      res.send("Values Inserted");
    }
  });
});

app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO users (UserId,UserName, Password, Role) VALUES ('1','adiish', 'adi1234', 'Admin')";
  db.query(sqlInsert, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log("Inserted a new user into the 'users' table.");
      res.send("Inserted a new user into the 'users' table.");
    }
  });
});

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
  // const sqlGet = "SELECT * FROM users WHERE UserID = ?";
  db.query(sqlUpdate, [Username, Password, Role,id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});
app.listen(5000, () => {
  console.log("server is running");
});
