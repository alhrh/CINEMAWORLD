const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');  

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "cinemaworld"
});


db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to the database successfully.");
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML', 'index.html'));  
});


app.post("/book", (req, res) => {
  const { name, movie, tickets, date, email } = req.body;

  const query = "INSERT INTO bookings (name, movie, tickets, date, email) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [name, movie, tickets, date, email], (err, result) => {
    if (err) {
      console.error("Error inserting booking:", err);
      return res.status(500).json({ message: "Error processing booking." });
    }
    res.status(200).json({ message: "Booking successful!" });
  });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
