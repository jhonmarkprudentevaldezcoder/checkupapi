const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Specialty: {
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
    Available_days: {
      type: String,
    },
    Available_from: {
      type: String,
    },
    Available_to: {
      type: String,
    },
    Doctor_Pic: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Doctors = mongoose.model("doctors", doctorSchema);

module.exports = Doctors;
