import socketIO from 'socket.io';

const connection = (socket) => {
  socket.emit('message', { message: "Hello World" });
  console.log("Connect");
}

export default function (app) {
  const io = socketIO(app);

  io.on('connection', connection);

  return io;
}
