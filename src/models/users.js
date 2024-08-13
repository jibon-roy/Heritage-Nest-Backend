import mongoose from "mongoose";
import userSchema from "../schema/user.js";

const usersModel = mongoose.model("users", userSchema);

export default usersModel;
