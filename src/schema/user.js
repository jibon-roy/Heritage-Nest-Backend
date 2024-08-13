import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: String,
    require: false,
  },
  gender: {
    type: String,
    require: false,
  },
  password: {
    type: String,
    required: false,
  },
});
export default userSchema;
