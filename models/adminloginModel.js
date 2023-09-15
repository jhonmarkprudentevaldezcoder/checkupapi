const mongoose = require("mongoose");

const adminloginSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Adminlogin = mongoose.model("adminlogin", adminloginSchema);

module.exports = Adminlogin;
