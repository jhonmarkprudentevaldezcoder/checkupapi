const mongoose = require("mongoose");

const patientSchema = mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Age: {
      type: String,
    },
    Address: {
      type: String,
    },
    Contact_Number: {
      type: String,
    },
    Email: {
      type: String,
    },
    Username: {
      type: String,
    },
    Password: {
      type: String,
    },
    Patient_Pic: {
      type: String,
    },
    Priority_Type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Patients = mongoose.model("patients", patientSchema);

module.exports = Patients;
