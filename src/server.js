import https from "https";
import SocketIO from "socket.io";
import express from "express";
import fs from "fs";


const options = {
  key: fs.readFileSync('key.pem'),
  cert:fs.readFileSync('cert.pem')
}

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpsServer = https.createServer(options, app);
const wsServer = SocketIO(httpsServer);

wsServer.on("connection", (socket) => {
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});

const handleListen = () => console.log(`Listening on https://localhost:3000`);
httpsServer.listen(3000, handleListen);
