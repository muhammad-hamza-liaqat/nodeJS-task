const mongo = require("mongoose");
// connecting to the database, will create the userDatabase 
mongo
  .connect(process.env.db_connection)
  .then(() => {
    console.log("MongoDB connected to nodeJSTASK!");
  })
  .catch((e) => {
    console.log("MongoDB not connected! error: ", e);
  });
module.exports= mongo;