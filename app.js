const express = require("express");
const app = express();

app.use(express.json());

app.use("/ecommerce", (req, res) => {
  res.send("Ali is here");
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is started at: ${port}`);
});
