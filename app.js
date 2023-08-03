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
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        secure: false,
        sameSite: true,
    },
});

app.use(sessionMiddleware);
io.engine.use(sessionMiddleware);

app.use(router);

io.on('connection', (socket) => {
    console.log("A user connected");

    const req = socket.request;

    socket.on('private message', ({ content, roomName, from }) => {
        console.log("Sent:", content, "\nfrom ", roomName);
        // console.log(req.session);
        // Simpan ke user session
        // req.session.reload((err) => {
        //     if (err) {
        //       return socket.disconnect();
        //     }
        //     req.session.chatLog.push({ content, roomName, from });
        //     req.session.save();
        //   });
        // Kembalikan isi pesan ke kode client-side
        socket.to(roomName).emit('private message', {
            content, roomName
        });
    });

    socket.on('join', function(room) {
        socket.join(room);
    });

});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
