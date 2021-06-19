const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/chat-room");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "error in connecting Db"));
db.once("open", function () {
  console.log("sucessfully connected to database::MONGODb ");
});
module.exports = db;
