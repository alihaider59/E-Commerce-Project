const express = require("express");
const app = express();
app.use(express.json());

//Import Routes
const mainRoutes = require("./Routes/mainRoutes");
const adminRoutes = require("./Routes/adminRoutes");

//Mounting All Routes
app.use("/ecommerce", mainRoutes);
app.use("/ecommerce/admin", adminRoutes);

//App Listening
const port = 8000;
app.listen(port, () => {
  console.log(`Server is started at:${port}`);
});
