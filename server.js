// BACKEND CODE | ICICI BANK || NODE.JS|| //

// |IMPORTING LIBRARIES| //
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const session = require("express-session");
const nodemailer = require("nodemailer");
const QRCode = require("qrcode");
require("dotenv").config();

// |CODE TO ESTABLISH A SESSION| //
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // |SESSION ESTABLISHED FOR  DAY| //
    },
  })
);

// |CONNECTING MySQL DATABASE| //
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error(
      "ERROR IN ESTABLISHING CONNECTION WITH MySQL DATABASE...",
      err
    );
    process.exit(1);
  }
  console.log("\n|| CONNECTION ESTABLISHED WITH MySQL DATABASE ||");
});

// |USERS TABLE - CREATION| //
db.query(
  `
    CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        qrCode TEXT NOT NULL
    )
`,
  (err, result) => {
    if (err) {
      console.error("ERROR IN CREATING users TABLE...", err);
      process.exit(1);
    }
    console.log("\n|| TABLE CREATED ||");
  }
);

// |PUBLIC DIRECTORY FOR STORING QR-CODES| //
const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// |SESSION CHECK FOR LOGGED-IN USER| //
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// |SIGNUP CODE HANDLED| //
app.post("/signup", async (req, res) => {
  const { username, password, email, phone } = req.body;

  // |USERNAME CHECK| //
  const checkQuery = "SELECT * FROM Users WHERE username = ?";
  db.query(checkQuery, [username], async (err, results) => {
    if (err) {
      console.error("ERROR IN CHECKING USERNAME...", err);
      res.status(500).json({ error: "INTERNAL SERVER ERROR..." });
      return;
    }
    if (results.length > 0) {
      res
        .status(400)
        .json({
          error:
            "SOMEONE IS HAVING SAME CHOICE AS YOURS. PLEASE CHOOSE DIFFERENT USERNAME",
        });
      return;
    }

    // |LOGIC FOR GENERATING QR-CODE| //
    // const qrCodePath = path.join(publicDir, `${username}.png`);
    // const qrCodeUrl = `http://localhost:${process.env.PORT || 3000}/public/${username}.png`;

    // try {
    //     await QRCode.toFile(qrCodePath, `Username: ${username}\nEmail: ${email}\nPhone: ${phone}`);
    // } catch (err) {
    //     console.error('Error generating QR code:', err);
    //     res.status(500).json({ error: 'Error generating QR code. Please try again.' });
    //     return;
    // }

    // |INSERTING VALUES| //
    const insertQuery =
      "INSERT INTO Users (username, password, email, phone, qrCode) VALUES (?, ?, ?, ?, ?)";
    db.query(
      insertQuery,
      [username, password, email, phone, ""],
      (err, result) => {
        if (err) {
          console.error("ERROR DURING SIGNUP...", err);
          res
            .status(500)
            .json({ error: "ERROR DURING SIGNUP. PLEASE TRY AGAIN" });
          return;
        }
        res.json({ success: true, redirect: "log-in.html" });
      }
    );
  });
});

// |LOGIN CODE HANDLED| //
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // |USERNAME AND PASSWORD VALIDATION FOR SUCCESSFUL LOGIN| //
  const query = "SELECT * FROM Users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("ERROR DURING LOGIN...", err);
      res.status(500).json({ error: "INTERNAL SERVER ERROR..." });
      return;
    }
    if (results.length === 0) {
      res
        .status(401)
        .json({ error: "INVALID USERNAME OR PASSWORD. PLEASE TRY AGAIN" });
      return;
    }

    const userData = results[0];
    req.session.user = userData;
    res.json({ success: true });
  });
});

// |FORGOT PASSWWORD CODE HANDLED| //
app.post("/forgot-password", (req, res) => {
  const { username, email } = req.body;

  // |USERNAME AND EMAIL VALIDATION FOR SUCCESSFUL EMAIL| //
  console.log("Username:", username);
  console.log("Email:", email);

  const query = "SELECT * FROM Users WHERE username = ? AND email = ?";
  db.query(query, [username, email], (err, results) => {
    if (err) {
      console.error("ERROR DURING FORGOT PASSWORD...", err);
      res.status(500).json({ error: "INTERNAL SERVER ERROR..." });
      return;
    }
    if (results.length === 0) {
      res
        .status(401)
        .json({ error: "OOPS! INVALID USERNAME OR EMAIL. PLEASE TRY AGAIN" });
      return;
    }
    const user = results[0];
    const password = user.password;

    // |NODEMAILER LIBRARY CODE HANDLED| //
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "ICICI Bank - Password Recovery",
      text: `DEAR ${username},\n\nYOUR PASSWORD IS: ${password}\n\nBEST REGARDS,\nICICI BANK™\nTHANK YOU FOR CHOOSING US!\n\n\nAll Rights Reserved.. | Copyright © 2024 ICICI BANK™`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("ERROR IN SENDING EMAIL...", error);
        res
          .status(500)
          .json({ error: "ERROR IN SENDING EMAIL. PLEASE TRY AGAIN" });
        return;
      }
      res.json({ success: true, redirect: "log-in.html" });
    });
  });
});

// |USER-DASHBOARD CODE HANDLED| //
app.get("/dashboard", requireLogin, (req, res) => {
  const userData = req.session.user;
  res.json({ userData });
});

// |LOGOUT CODE HANDLED| //
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("FAILURE IN DESTROYING SESSION", err);
      return res.status(500).json({ error: "|LOGOUT FAILED|" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
});

app.use(express.static(publicDir));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n|| CONNECTION ESTABLISHED ON:- http://localhost:${PORT} ||`);
});
