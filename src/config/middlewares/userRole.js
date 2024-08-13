const isAdmin = (req, res, next) => {
  const role = req.headers["x-user-role"];

  if (role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin role required" });
  }

  next();
};

const isBidder = (req, res, next) => {
  const role = req.headers["x-user-role"];

  if (role !== "bidder") {
    return res.status(403).json({ message: "Forbidden: Bidder role required" });
  }

  next();
};
const isPropertyOwner = (req, res, next) => {
  const role = req.headers["x-user-role"];

  if (role !== "property_owner") {
    return res
      .status(403)
      .json({ message: "Forbidden: Property owner required" });
  }

  next();
};

export { isAdmin, isBidder, isPropertyOwner };
