import {Server as IOServer, Socket} from 'socket.io';

const componentMove = (io: IOServer, socket: Socket, data: any) => {
  socket.broadcast.emit('componentMove', data);
}

const connection = (io: IOServer, socket: Socket) => {
  console.log("Connect");

  socket.on('componentMove', (data) => componentMove(io, socket, data));
}

export default function (app: Express.Application) {
  const io = new IOServer(app);

  io.on('connection', (socket) => connection(io, socket));

  return io;
}
