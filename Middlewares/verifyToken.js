const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token Provided", code: 401 });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token", code: 403 });
    }
    req.user = decoded;
    next();
  } catch (error) {
     res.status(500).json({ message: "Something went wrong!", Error: error.message, code: 500 });
  }
};

module.exports = verifyToken;
