import { io } from './http';
import Cache from './cache';

interface RoomUser {
  socket_id: string,
  userName: string,
  room: string
}

interface Message {
  room: string,
  text: string,
  createdAt: Date,
  userName: string
}

const users: RoomUser[] = [];

io.on('connection', async socket => {

  socket.on('selected_room', async (data, callback) => {
    socket.join(data.room);
    const key = `Sala: ${data.room}`;

    const userInRoom = users.find(user => user.userName === data.userName && user.room === data.room);

    const oldMessage: Message[] = await Cache.get(key);

    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      users.push({
        socket_id: socket.id,
        userName: data.userName,
        room: data.room
      })
    }

    const messagesRoom = oldMessage !== null
    ? oldMessage.filter(message => message.room === data.room)
    : [];
    callback(messagesRoom);
  });

  socket.on('message', async data => {
    const message: Message = {
      room: data.room,
      userName: data.userName,
      text: data.message,
      createdAt: new Date()
    }

    const key = `Sala: ${data.room}`
    const oldMessage = await Cache.get(key);

    let menssage = [message]

    if (oldMessage !== null) {
      menssage = [...oldMessage, ...menssage]
    }

    Cache.set(key, menssage);

    io.to(data.room).emit('message', message);
  })
});
