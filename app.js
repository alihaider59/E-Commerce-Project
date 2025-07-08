require("dotenv").config();
const hpp = require("hpp");
const http = require("http");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const express = require("express");
const Chat = require("./Models/chats");
const rateLimit = require("express-rate-limit");
const authSocket = require("./Middlewares/authSocket");
const upload = require("./Middlewares/upload");
const handleSocket = require("./Utils/socketio");
const { Server } = require("socket.io");
const { swaggerUi, swaggerSpec } = require("./swagger");
const color = require("colors");

//Import Routes
const mainRoutes = require("./Routes/mainRoutes");
const adminRoutes = require("./Routes/adminRoutes");

const app = express();

// 1. Security Middlewares
app.use(helmet());
app.use(hpp());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  message: "Too many requests from this IP, try again later.",
});

// 3. Mounting All Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/ecommerce", limiter, mainRoutes);
app.use("/api/ecommerce/admin", limiter, adminRoutes);

// Default route
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to the E-Commerce Backend API is running 🚀</h1><p>Visit <a href='/api-docs'>Swagger Docs</a> for API documentation.</p>"
  );
});

// 4. Server and Socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: ["http://localhost:3000", "http://localhost:3001"],
});
io.use(authSocket);
handleSocket(io);

//App Listening
const port = 8000;
server.listen(port, () => {
  console.log(`Server is started at:${port}`);
  console.log("Mongo URI:".blue, process.env.MONGO_URI);
  console.log(`Swagger docs available at: http://localhost:${port}/api-docs`);
});
