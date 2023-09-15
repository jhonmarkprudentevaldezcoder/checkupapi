const mongoose = require("mongoose");

const checkuptypeSchema = mongoose.Schema(
  {
    Check_up_type_name: {
      type: String,
    },
    Contact_Number: {
      type: String,
    },
    Available_Day: {
      type: String,
    },
    Time_from: {
      type: String,
    },
    Time_to: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const check_up_type = mongoose.model("check_up_type", checkuptypeSchema);

module.exports = check_up_type;
