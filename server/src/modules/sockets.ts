import {Server as IOServer, Socket} from 'socket.io';

const connection = (socket: Socket) => {
  socket.emit('message', { message: "Hello World" });
  console.log("Connect");
}

export default function (app: Express.Application) {
  const io: IOServer = new IOServer(app);

  io.on('connection', connection);

  return io;
}
