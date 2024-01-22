const mongo = require("mongoose");
// connecting to the database, will create the userDatabase 
mongo
  .connect("mongodb://localhost:27017/nodeJSTASK")
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((e) => {
    console.log("MongoDB not connected! error: ", e);
  });
module.exports= mongo;