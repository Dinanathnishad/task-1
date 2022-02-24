const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  pin: {
    type: Number,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  mobile_no: {
    type: Number,
    required: true,
    trim: true,
  },
});
const AddressSchema = new mongoose.model("UserAddress", addressSchema);
module.exports = AddressSchema;
