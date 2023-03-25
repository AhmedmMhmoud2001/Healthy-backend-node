

// privateChat.js
const { Router } = require('express');
const app = Router();
const User = require('../models/User.model');
const Doctor = require('../models/Doctor.model');
const Message = require('../models/Message.model')

const privateChat = (io) => {
  io.on('connection', (socket) => {
    socket.on('user-connect', async (userId) => {
      const user = await User.findOne({_id: userId });
      if (user) {
        user.socketId = socket._id;
      } else {
        const newUser = new User({_id: userId, socketId: socket._id });
        await newUser.save();
      }
    });

    socket.on('doctor-connect', async (doctorId) => {
      const doctor = await Doctor.findOne({_id: doctorId });
      if (doctor) {
        doctor.socketId = socket._id;
      } else {
        const newDoctor = new Doctor({_id: doctorId, socketId: socket._id });
        await newDoctor.save();
      }
    });

    socket.on('private-message', async (data) => {
      const { recipient, sender, message } = data;
      const recipientUser = await User.findOne({_id: recipient });
      const recipientDoctor = await Doctor.findOne({_id: recipient });
      const senderUser = await User.findOne({_id: sender });
      const senderDoctor = await Doctor.findOne({_id: sender });

      if (recipientUser) {
        io.to(recipientUser.socketId).emit('private-message', { sender, message });
      } else if (recipientDoctor) {
        io.to(recipientDoctor.socketId).emit('private-message', { sender, message });
      }

      // Save the message to a database or other persistent storage if desired
    });
  });



  app.get('/:userId/:doctorId/messages', async (req, res) => {
    const { userId, doctorId } = req.params;
    const messages = await Message.find({ userId, doctorId });
    res.status(200).json({ messages });
  });

  return app;
};


module.exports = privateChat;




