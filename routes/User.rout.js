const User = require('../models/User.model')
const { Router } = require('express');
const app = Router();
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

// Create a new user register

app.post('/register',async (req, res) => {
  try {
    const { firstname,lastname,phone, email, password } = req.body;
    const user = new User({ firstname,lastname,phone, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// login
app.post('/login',async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid login credentials');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid login credentials');
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);
    res.status(200).json
    ({ token });
} catch (error) {
res.status(401).json({ error: error.message });
}
});

// Create a new user
// app.post('/users', (req, res) => {
//     const user = new User({
  // firstname:req.body.firstname,
  // lastname:req.body.lastname,
  // phone:req.body.phone,
  // email: req.body.email,
  // password: req.body.password
//     });
  
//     user.save().then(() => {
//       res.send(user);
//     }).catch((error) => {
//       res.status(500).send({
//         message: error.message || 'Failed to create user.'
//       });
//     });
//  });

  // Retrieve all users
  app.get('/users', (req, res) => {
    User.find().then((users) => {
      res.send(users);
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Failed to retrieve users.'
      });
    });
  });
  
  // Retrieve a single user by id
  app.get('/users/:id', (req, res) => {
    User.findById(req.params.id).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found.'
        });
      }
  
      res.send(user);
    }).catch((error) => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found.'
        });
      }
  
      res.status(500).send({
        message: error.message || 'Failed to retrieve user.'
      });
    });
  });
  
  // Update a user by id
  app.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      phone:req.body.phone,
      email: req.body.email,
      password: req.body.password
    }, { new: true }).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found.'
        });
      }
  
      res.send(user);
    }).catch((error) => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found.'
        });
      }
  
      res.status(500).send({
        message: error.message || 'Failed to update user.'
      });
    });
  });
  
  // Delete a user by id
  app.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found.'
        });
      }
      res.send({
        message: 'User deleted successfully'})
      })
      .catch((error) => {
          if (error.kind === 'ObjectId' || error.name === 'NotFound') {
          return res.status(404).send({
          message: 'User not found.'
          });
          }
          res.status(500).send({
              message: error.message || 'Failed to delete user.'
            });
          });
      
  })

  module.exports = app;