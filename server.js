const express = require("express");
const mongoose = require("mongoose");
const Patients = require("./models/patientModel");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Doctors = require("./models/doctorModel");
const check_up_type = require("./models/checkuptypesModel");
const Adminlogin = require("./models/adminloginModel");

const app = express();
const activeSessions = {};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// fetch all check-up_types
app.get("/check_up_type", async (req, res) => {
  try {
    const checkUpType = await check_up_type.find({});
    res.status(200).json(checkUpType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// fetch all patients
app.get("/patients", async (req, res) => {
  try {
    const patients = await Patients.find({});
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//register
app.post("/register", async (req, res) => {
  const { Email } = req.body;

  try {
    // Check if the email is already taken
    const existingUser = await Patients.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already taken." });
    }

    // If the email is not taken, create the user
    const patients = await Patients.create(req.body);
    res.status(200).json(patients);
    console.log("User registered!");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// fetch all doctors
app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctors.find({});
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Adminlogin.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User not found." });
    }

    // Compare the provided password with the stored password
    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Incorrect password." });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    // Set the token as a cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour

    // Respond with the token as a Bearer token
    res.status(200).json({
      message: "Authentication successful",
      token: `${token}`,
      userId: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Logout endpoint
app.post("/logout", (req, res) => {
  const authToken = req.body.authToken;

  if (activeSessions[authToken]) {
    delete activeSessions[authToken];
    res.status(200).json({ message: "Logout successful" });
  } else {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

//check authentication

function authenticateToken(req, res, next) {
  // Get the token from the request headershaha
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Missing or invalid token." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token.replace("Bearer ", ""), "your-secret-key");
    req.user = decoded;

    // next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
}

app.get("/protected", authenticateToken, (req, res) => {
  // If the middleware passes, the user is authenticated
  res.status(200).json({
    message: "Protected resource accessed by user: " + req.user.userId,
  });
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://onlinecheckupappointment:onlinecheckup@cluster0.vstwvvj.mongodb.net/onlinecheckup"
  )
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
