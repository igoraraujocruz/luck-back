import { io, serverHttp } from './http';

io.on("connection", (socket) => {
    io.to(socket.id).emit("mySocketId", socket.id)
    socket.on("room", data => {
        socket.join(data);
    });
})


serverHttp.listen(3333, () => {
    console.log('Server started on port 3333')
})