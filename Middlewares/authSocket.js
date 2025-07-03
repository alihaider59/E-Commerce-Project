const jwt = require("jsonwebtoken");

const authSocket = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("No token provided"));
  }

  try {
    const decoded = jwt.verify(token, "abc123");
    socket.data.user = decoded;
    next();
  } catch (error) {
    console.error("Socket auth error:", error.message);
    next(new Error("Authentication failed"));
  }
};

module.exports = authSocket