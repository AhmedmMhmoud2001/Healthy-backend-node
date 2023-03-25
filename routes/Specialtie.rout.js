const Specialtie = require('../models/Specialtie.model')
const { Router } = require('express');
const app = Router();
const SpecialtieController =require('../controllers/Specialtie.controller')


// Create a new specialtie
app.post('/specialties',SpecialtieController.CreateSpeialtie);
// Retrieve all specialties
app.get('/specialties', SpecialtieController.ReadAllSpeialtie);

// Retrieve a single specialtie by id
app.get('/specialties/:id', SpecialtieController.ReadOneSpeialtie);
  

  // Update a specialtie by id
  app.put('/specialties/:id',SpecialtieController.UpdateOneSpeialtie);



  // Delete a specialtie by id
  app.delete('/specialties/:id', SpecialtieController.DeleteOneSpeialtie);


 module.exports = app;