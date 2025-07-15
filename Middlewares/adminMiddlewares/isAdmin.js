const UserProfiles = require("../../Models/userProfiles");
const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided", code: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const _id = decoded.profileId;
    const adminCheck = await UserProfiles.findOne({ _id });
    if (adminCheck.role === "admin") {
      req.user = _id;
      next();
    } else {
      return res.status(403).json({ message: "You're not an admin", code: 403 });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", Error: error.message, code: 500});
  }
};

module.exports = isAdmin;
