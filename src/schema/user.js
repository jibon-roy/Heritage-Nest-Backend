import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: String,
    require: false,
    default: null,
  },
  gender: {
    type: String,
    require: false,
    default: null,
  },
  password: {
    type: String,
    required: false,
    default: null,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "bidder", "property_owner"],
    default: "bidder",
  },
});
export default userSchema;
