const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const cors = require("cors");
const pingRouter = require("./routes/ping");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const messagesRouter = require("./routes/messages");
const conversationsRouter = require("./routes/conversation");
const auth = require("./middleware/auth");
const http = require("http");
var socket_io = require("socket.io");

const db = require("./db");

const { json, urlencoded } = express;

const app = express();
const io = socket_io();

const connectedUsers = [];
// app.options("*", cors(origin));
// app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader("Content-Type", "application/json");
  next();
});
io.on("connection", (socket) => {
  console.log("New user connected!");
  const conversationRoom = socket.handshake.query.roomId;
  socket.join(conversationRoom);
  //If the conversationRoom already exists, makes sure the socketId is added to the respective array
  //and not replace the already present values
  connectedUsers.push(socket.id);
  console.log(conversationRoom);

  console.log("on connect", connectedUsers);
  socket.on(
    "message",
    ({ sender, message, roomId, createdAt, conversationId, _id }) => {
      io.in(roomId).emit("message", {
        sender,
        message,
        createdAt,
        conversationId,
        _id,
      });
    }
  );

  socket.on("disconnect", () => {
    connectedUsers.pop(socket.id);
  });
});

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/messages", auth, messagesRouter);
app.use("/conversations", auth, conversationsRouter);
app.use("/ping", pingRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = { app, io };
