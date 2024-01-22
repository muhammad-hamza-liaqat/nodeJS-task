const express = require("express");
const app = express();
// require env
require("dotenv").config();
// require database
require("./database/connection")


// creating server
app.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost${process.env.PORT}`);
});
