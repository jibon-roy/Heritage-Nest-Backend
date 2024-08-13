import express from "express";
import {
  allUsers,
  loginUser,
  loginWithGooglePopup,
  registerUser,
} from "../../routes/users/users.js";
import { verifyToken } from "../../config/middlewares/JWT.js";
import { isAdmin } from "../../config/middlewares/userRole.js";

const router = express.Router();

router.use("/users", verifyToken, isAdmin, allUsers);
router.post("/user/login", loginUser);
router.post("/user/google-login", loginWithGooglePopup);
router.post("/user/register", registerUser);

export default router;
