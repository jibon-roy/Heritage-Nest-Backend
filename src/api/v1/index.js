import express from "express";
import {
  allUsers,
  deleteUser,
  loginUser,
  loginWithGooglePopup,
  registerUser,
  updateUserRole,
  usersWithEmail,
} from "../../routes/users/users.js";
import { verifyToken } from "../../config/middlewares/JWT.js";
import { isAdmin, isPropertyOwner } from "../../config/middlewares/userRole.js";
import {
  filterProperties,
  getAllProperty,
  getPropertyByEmail,
  getPropertyById,
  postProperty,
  updateProperty,
} from "../../routes/property/property.js";
import { getBidById, getBids, postBid } from "../../routes/bid/bid.js";

const router = express.Router();
// user routes
router.get("/users/email", usersWithEmail);
router.use("/users", allUsers);
router.delete("/user/:id", verifyToken, isAdmin, deleteUser);
router.put("/user/:id", verifyToken, isAdmin, updateUserRole);
router.post("/user/login", loginUser);
router.post("/user/google-login", loginWithGooglePopup);
router.post("/user/register", registerUser);

// property routes
router.get("/properties", getAllProperty);
router.get("/properties/search", filterProperties);
router.get("/properties/:email", verifyToken, getPropertyByEmail);
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
  isAdmin || isPropertyOwner,
  updateProperty
);
router.delete(
  "/property/delete/:id",
  verifyToken,
  isAdmin || isPropertyOwner,
  updateProperty
);

// bid section
router.post("/bid", postBid);
router.get("/bids", getBids);
router.get("/bid/:id", getBidById);
export default router;
