import express from "express";
import {
  allUsers,
  deleteUser,
  loginUser,
  loginWithGooglePopup,
  registerUser,
  updateUserRole,
} from "../../routes/users/users.js";
import { verifyToken } from "../../config/middlewares/JWT.js";
import { isAdmin, isPropertyOwner } from "../../config/middlewares/userRole.js";
import {
  getAllProperty,
  getPropertyById,
  postProperty,
  updateProperty,
} from "../../routes/property/property.js";

const router = express.Router();
// user routes
router.use("/users", verifyToken, isAdmin, allUsers);
router.delete("/user/:id", verifyToken, isAdmin, deleteUser);
router.put("/user/:id", verifyToken, isAdmin, updateUserRole);
router.post("/user/login", loginUser);
router.post("/user/google-login", loginWithGooglePopup);
router.post("/user/register", registerUser);

// property routes
router.get("/properties", getAllProperty);
router.get("/property/:id", getPropertyById);
router.post(
  "/add-property",
  verifyToken,
  // isPropertyOwner || isAdmin,
  postProperty
);
router.put(
  "/property/update/:id",
  verifyToken,
  isPropertyOwner || isAdmin,
  updateProperty
);
router.delete(
  "/property/delete/:id",
  verifyToken,
  isPropertyOwner || isAdmin,
  updateProperty
);

export default router;
