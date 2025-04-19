const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');  // إضافة استيراد path

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
  password: "", // تأكد من أنك لم تضف كلمة مرور في XAMPP أو ضع الكلمة الصحيحة
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

// Route to serve the home page (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML', 'index.html'));  // تأكد من المسار الصحيح لملف index.html
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
