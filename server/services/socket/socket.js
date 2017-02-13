import SocketIO from 'socket.io';
import jwt from 'jsonwebtoken';
import adapter from 'socket.io-redis';
import sessionMiddleware from '../../middleware/session';
import { pub, sub } from '../redis';
import getConfig from '../../../config/get';

export default (server) => {
  if (!server) {
    throw new Error('SocketServer::constructor() - No server object provided');
  }

  const io = SocketIO(server);

  io.adapter(adapter({ pubClient: pub, subClient: sub }));
  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  io.on('connection', (socket) => {
    socket.request.session;
    console.log('New connection', socket.request.session.user);
    // socket.on('disconnect', onDisconnection.bind(socket));
    // socket.on('user login', onUserLogin.bind(socket));
    // socket.on('chat message', onChatMessage.bind(socket));
  });
  return io;
};

sub.on('message', onRedisMessage.bind(this));
sub.subscribe('chat::message');

sub.on('subscribe', (channel, count) => {
  console.log(channel, count);
});

function onRedisMessage(channel, message) {
  console.log(`Socket::onRedisMessage() - ${message}`);
  io.emit('chat message', JSON.parse(message));
}

// function onDisconnection() {
// console.log(`${this.username} disconnected`);
// }
//
// function onUserLogin(username) {
// if (!username) {
// console.warn('Username not provided');
// return;
// }
// this.username = username;
// users[this.username] = this;
// console.log(`${this.username} has logged into the server.`);
// this.broadcast.emit('user login', this.username);
// }
//
// function onChatMessage(message) {
// if (!this.username) {
// console.log('User has no username');
// return;
// }
// var msgObj = {
// user: this.username,
// payload: message
// };
// pub.publish('chat::message', JSON.stringify(msgObj));
// console.log(`Socket::onChatMessage() - ${this.username}: ${msgObj.payload}`);
// }
