import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:8000"],
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected: ' + socket.id);
    socket.on('send_msg', (convo) => {
        if(convo.message.length){
            socket.broadcast.emit(`user_${convo.receiver}`, convo);
        }
    });
});

server.listen(3030, () => {
    console.log('Server is running on port 3030');
});