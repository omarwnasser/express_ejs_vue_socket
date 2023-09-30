const express = require("express");
const { Server } = require("http");
const cors = require("cors");
const io = require("socket.io");

const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.use(express.static('public'))

const server = new Server(app);

const socket = new io.Server(server);

socket.on("connection", (so) => {
  console.log(so.id);

  so.on('send ready request',(data)=>{
    socket.emit('add ready request',data)
  })

  so.on('get all list',()=>{
    console.log('get all list');
    socket.emit('send all list')
  })

});

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/admin", function (req, res) {
  res.render("admin");
});

app.get("/request", function (req, res) {
  res.render("request");
});


app.get("/**", function (req, res) {
  res.send("page not found");
});

server.listen(3000, () => {
  console.log("connect to server successfully");
});
