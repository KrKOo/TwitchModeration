import socketIO from 'socket.io';

export function listen(app) {
  return socketIO(app);
}
