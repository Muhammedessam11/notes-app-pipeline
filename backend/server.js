const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "notes"
});

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.message);
  } else {
    console.log("Connected to the database.");
  }
});

app.get("/notes", (req, res) => {
  db.query("SELECT * FROM notes", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/notes", (req, res) => {
  const note = req.body.note;
  db.query("INSERT INTO notes (content) VALUES (?)", [note], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, note });
  });
});

app.listen(5000, () => console.log("Backend running on port 5000"));

