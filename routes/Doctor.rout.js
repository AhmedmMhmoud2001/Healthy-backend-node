const { Router } = require('express');
const app = Router();
const DoctorController =require('../controllers/Doctors.controller.js')
// const jwt = require('jsonwebtoken');
// const { SECRET_KEY } = process.env;

// Create a new Doctor register
// app.post('/register',async (req, res) => {
//   try {
//     const { firstname,lastname,phone, email, password } = req.body;
//     const user = new Doctor({ firstname,lastname,phone, email, password });
//     await user.save();
//     const token = jwt.sign({ userId: user._id }, SECRET_KEY);
//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
// // login
// app.post('/login',async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await Doctor.findOne({ email });
//     if (!user) throw new Error('Invalid login credentials');
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) throw new Error('Invalid login credentials');
//     const token = jwt.sign({ userId: user._id }, SECRET_KEY);
//     res.status(200).json
//     ({ token });
// } catch (error) {
// res.status(401).json({ error: error.message });
// }
// });

// Create a new doctor
app.post('/doctors', DoctorController.CreateDoctor);

  // Retrieve all doctor
  app.get('/doctors',DoctorController.ReadAllDoctor);
  
  // Retrieve a single doctor by id
  app.get('/doctors/:id',DoctorController.ReadOneDoctor);
  
  // Update a doctor by id
  app.put('/doctors/:id',DoctorController.UpdateDoctor);
  
  // Delete a doctor by id
  app.delete('/doctors/:id',DoctorController.DeleteDoctor)
module.exports = app;
