const Chats = require("../Models/chats");

const handleSocket = async (io) => {
  io.on("connection", (socket) => {

    const senderId = socket.data.user.profileId;
    console.log("Socket connected", socket.id);
    socket.emit("message", "Welcome to the Server");

    socket.on("joinRoom", async (roomId) => {
      socket.join(roomId);
      console.log(`Joined room: ${roomId}`);
    });

    socket.on("userMessage", async ({ roomId, sender, message }) => {
      const chat = await Chats.create({ senderId, sender, message, roomId });
      socket.to(roomId).emit("message", `${sender}: ${message}`);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
};

module.exports = handleSocket;
