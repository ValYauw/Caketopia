const express = require("express");
const session = require("express-session");
const http = require('http');
const socketIO = require("socket.io");
const router = require("./routes/index");

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:8080",
    }
})

app.set("views", "./views");
app.use("/public", express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const sessionMiddleware = session({
    secret: "thepasswordisalwaysswordfish",
    resave: false, //Forces the session to be saved back to the session store
    saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store
    cookie: {
        secure: false,
        sameSite: true,
    },
});

app.use(sessionMiddleware);

app.use(router);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        // console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
