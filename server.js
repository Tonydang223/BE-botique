require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connectDB = require("./database/mongoDB");
const SocketServer = require("./socketServer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('combined'));


const port = process.env.PORT || 4040;

//socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  SocketServer(socket);
});

//Routers
app.use("/api", require("./routers/authRouter"));
app.use("/api", require("./routers/userRouter"));
app.use("/api", require("./routers/productRouter"));
app.use("/api", require("./routers/categoryRouter"));
app.use("/api", require("./routers/cartRouter"));
app.use("/api", require("./routers/historyRouter"));
app.use("/api", require("./routers/stripeRouter"));
app.use("/api", require("./routers/emailRouter"));
app.use("/api", require("./routers/messageRouter"));
app.use("/api", require("./routers/ratingRouter"));
app.use("/api", require("./routers/notifyRouter"));

//!important
  // const buildDir = path.join(__dirname, "/build")
  // app.use(express.static(buildDir));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(buildDir, "index.html"));
  // });
connectDB();

http.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
