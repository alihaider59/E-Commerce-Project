const jwt = require("jsonwebtoken");
const secret = "abc123";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ message: "Access denied. No token Provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      return res.json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  } catch (error) {
     res.json({ message: "Something went wrong!", Error: error.message });
  }
};

module.exports = verifyToken;
