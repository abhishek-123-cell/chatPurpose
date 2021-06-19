const http = require("http");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const socketio = require("socket.io");
const db = require("../server/config/mongo");
const WebSockets = require("./utils/WebSockets");
// routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const chatRoomRouter = require("./routes/chatRoom");
const deleteRouter = require("./routes/delete");
// middlewares
const { decode } = require("./middlewares/jwt");

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

/** Create HTTP server. */
const server = http.createServer(app);
/** Create socket connection */
global.io = socketio.listen(server);
global.io.on("connection", WebSockets.connection);
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
