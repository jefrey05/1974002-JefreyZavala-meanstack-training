let app = require("express")();
let http = require("http").Server(app); // to load the library we have to run port number using hhtp module
let io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Client connected to application.....");

  socket.on("name", (name) => {
    console.log("Hello: " + name);
  });

  socket.on("message", (message) => {
    console.log("Your: " + message);
  });
});
http.listen(9090, () => console.log("server running on port number 9090"));
