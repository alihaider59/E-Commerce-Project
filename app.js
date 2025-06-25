const hpp = require("hpp");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();

require('dotenv').config();

// 1. Set secure headers
app.use(helmet());

// 2. Enable CORS for your frontend domain only
app.use(
  cors({
    origin: "http://localhost:3000", // change in prod
    credentials: true,
  })
);

// 3. Prevent HTTP parameter pollution
app.use(hpp());

// 4. Rate limiting (e.g. max 100 requests per 15 mins)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  message: "Too many requests from this IP, try again later.",
});

app.use(express.json());

//Import Routes
const mainRoutes = require("./Routes/mainRoutes");
const adminRoutes = require("./Routes/adminRoutes");

//Mounting All Routes
app.use("/ecommerce", limiter, mainRoutes);
app.use("/ecommerce/admin", limiter, adminRoutes);
app.use("/ecommerce/public", limiter, express.static(path.join(__dirname, "Public")));

//App Listening
const port = 8000;
app.listen(port, () => {
  console.log(`Server is started at:${port}`);
  console.log("Mongo URI:", process.env.MONGO_URI);
});
