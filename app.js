const express = require("express");
const path = require("path");
const app = express();
app.use(express.json());

//Import Routes
const mainRoutes = require("./Routes/mainRoutes");
const adminRoutes = require("./Routes/adminRoutes");

//Mounting All Routes
app.use("/ecommerce", mainRoutes);
app.use("/ecommerce/admin", adminRoutes);
app.use("/ecommerce/public", express.static(path.join(__dirname, "Public")));

//App Listening
const port = 8000;
app.listen(port, () => {
  console.log(`Server is started at:${port}`);
});

//hahaha we have pushed the code