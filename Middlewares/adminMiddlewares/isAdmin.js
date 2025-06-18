const UserProfiles = require("../../Models/userProfiles");
const jwt = require("jsonwebtoken");
const secret = "abc123";

const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ message: "Access denied. No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);
    const _id = decoded.profileId;
    const adminCheck = await UserProfiles.findOne({ _id });
    if (adminCheck.role === "admin") {
      req.user = _id;
      next();
    } else {
      return res.json({ message: "You're not an admin" });
    }
  } catch (error) {
    res.json({ message: "Something went wrong!", Error: error.message });
  }
};

module.exports = isAdmin;
