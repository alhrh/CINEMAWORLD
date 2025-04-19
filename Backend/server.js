const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // leave it empty unless you set a password in XAMPP
  database: "cinemaworld"
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to the database successfully.");
});

// Route to handle booking
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.post("/contact", (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    mobile,
    dob,
    email,
    language,
    message
  } = req.body;

  const query = `
    INSERT INTO contacts (firstName, lastName, gender, mobile, dob, email, language, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [firstName, lastName, gender, mobile, dob, email, language, message], (err, result) => {
    if (err) {
      console.error("Error inserting contact message:", err);
      return res.status(500).json({ message: "Failed to send message." });
    }

    res.status(200).json({ message: "Message sent successfully!" });
  });
});