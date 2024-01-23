const express = require("express");
const app = express();
// require env
require("dotenv").config();
// require database
require("./database/connection");
const cors = require("cors");
const bodyParser = require("body-parser");

// middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes
const userRoute = require("./routes/userRoutes");
const carRoute = require("./routes/carRoutes");
const categoryRoute = require("./routes/categoryRoutes");
// using routes
app.use("/api/user", userRoute);
app.use("/api/car", carRoute);
app.use("/api/category", categoryRoute);
// creating server
app.listen(process.env.PORT, () => {
  console.log(`server running at http://localhost${process.env.PORT}`);
});
