const UserProfiles = require("../../Models/userProfiles");
const jwt = require("jsonwebtoken");

const isSuperAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ message: "Access denied. No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const _id = decoded.profileId;
    const adminCheck = await UserProfiles.findOne({ _id });
    if (adminCheck.role === "superadmin") {
      req.user = _id;
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Access denied: Super Admin only" });
    }
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

module.exports = isSuperAdmin;
