import { Server as IOServer, Socket } from 'socket.io';

const componentTransform = (io: IOServer, socket: Socket, data: any) => {
  console.log(data);
  socket.broadcast.emit('componentTransform', data);
};

const connection = (io: IOServer, socket: Socket) => {
  console.log('Connect');

  socket.on('componentTransform', (data) =>
    componentTransform(io, socket, data)
  );
};

export default (app: Express.Application) => {
  const io = new IOServer(app);

  io.on('connection', (socket) => connection(io, socket));

  return io;
};
