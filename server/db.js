const mongoose = require("mongoose");

mongoose.connect(process.env.DB_LOCAL_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", function () {
  console.log("Connection Successful!");
});
