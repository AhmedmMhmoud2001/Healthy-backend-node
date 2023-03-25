const { Router } = require('express');
const app = Router();
const UserController =require('../controllers/User.controller')
const validationRegistration =require('../middleware/validate.register')


  // Create a new user register
  app.post('/register',validationRegistration,UserController.Createregister);

  // login
  app.post('/login',UserController.Createlogin);

  // Create a new user
  app.post('/users', UserController.Createuser);

  // Retrieve all users
  app.get('/users', UserController.Readalluser);
  
  // Retrieve a single user by id
  app.get('/users/:id', UserController.Readuserbyid);
  
  // Update a user by id
  app.put('/users/:id',UserController.Updateuserbyid);
  
  // Delete a user by id
  app.delete('/users/:id', UserController.Deleteuserbyid)

  module.exports = app;