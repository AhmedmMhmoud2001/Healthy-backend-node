const { Router} = require('express');
const app =  Router();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const Message = require('../models/Message.model');

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // receive message from client
  socket.on('chat message', (msg) => {
    const { senderId, recipientId, message } = msg;

    // save message to database
    const newMessage = new Message({
      senderId,
      recipientId,
      message,
      timestamp: new Date()
    });

    newMessage.save(function(err) {
      if (err) return next(err);

      // emit message to sender
      socket.emit('chat message', newMessage);

      // emit message to recipient, if online
      const recipientSocket = io.sockets.sockets.find(
        (s) => s.userId === recipientId
      );
      if (recipientSocket) {
        recipientSocket.emit('chat message', newMessage);
      }
    });
  });

  // set user ID when socket is connected
  socket.on('set userId', (userId) => {
    socket.userId = userId;
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


// // send a message
// app.post('/messages', function(req, res, next) {
//     const { senderId, recipientId, message } = req.body;
  
//     const newMessage = new Message({
//       senderId,
//       recipientId,
//       message,
//       timestamp: new Date()
//     });
  
//     newMessage.save(function(err) {
//       if (err) return next(err);
//       res.send('Message sent');
//     });
//   });
  


// get messages between two users
app.get('/messages', function(req, res, next) {
  const userId1 = req.query.userId1;
  const userId2 = req.query.userId2;

  Message.find({
    $or: [
      { senderId: userId1, recipientId: userId2 },
      { senderId: userId2, recipientId: userId1 }
    ]
  }).exec(function(err, messages) {
    if (err) return next(err);
    res.send(messages);
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});

module.exports = app;