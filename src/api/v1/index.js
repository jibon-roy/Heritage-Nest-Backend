import express from "express";
import {
  allUsers,
  loginUser,
  loginWithGooglePopup,
  registerUser,
} from "../../routes/users/users.js";

const router = express.Router();

router.use("/users", allUsers);
router.post("/user/login", loginUser);
router.post("/user/google-login", loginWithGooglePopup);
router.post("/user/register", registerUser);

export default router;
