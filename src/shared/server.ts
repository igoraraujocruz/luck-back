import { io, serverHttp } from './http';

io.on("connection", (socket) => {  
    socket.on("room", data => {
        socket.join(data);
        socket.emit("mySocketId", socket.id)
    });

    socket.on('disconnect', () => {
        socket.disconnect()      
    })
});

serverHttp.listen(3333, () => {
    console.log('Server started on port 3333')
})