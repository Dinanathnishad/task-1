const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  mobile_no: {
    type: Number,
    required: true,
    trim: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const ProfileSchema = new mongoose.model("UserProfile", userSchema);
module.exports = ProfileSchema;
