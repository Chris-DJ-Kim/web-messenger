const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/test_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", function () {
  console.log("Connection Successful!");
});
