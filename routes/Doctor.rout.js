const Doctor = require('../models/Doctor.model')
const { Router } = require('express');
const app = Router();
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

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
app.post('/doctors', (req, res) => {
    const doctor = new Doctor({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phone:req.body.phone,
        email: req.body.email,
        password: req.body.password,
        img:req.body.img,
        adminAgree:req.body.adminAgree,
        yearsOfExperience:req.body.yearsOfExperience,
        description: req.body.description,
        medicineLicense:req.body.medicineLicense,
        address:req.body.address,
        specialtie: req.body.specialtie
    });
  
    doctor.save().then(() => {
      res.send(doctor);
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Failed to create doctor.'
      });
    });
 });

  // Retrieve all users
  app.get('/doctors', (req, res) => {
    Doctor.find().then((doctors) => {
      res.send(doctors);
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Failed to retrieve doctors.'
      });
    });
  });
  
  // Retrieve a single doctor by id
  app.get('/doctors/:id', (req, res) => {
    Doctor.findById(req.params.id).then((doctor) => {
      if (!doctor) {
        return res.status(404).send({
          message: 'doctor not found.'
        });
      }
  
      res.send(doctor);
    }).catch((error) => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'doctor not found.'
        });
      }
  
      res.status(500).send({
        message: error.message || 'Failed to retrieve doctor.'
      });
    });
  });
  
  // Update a doctor by id
  app.put('/doctors/:id', (req, res) => {
    Doctor.findByIdAndUpdate(req.params.id, {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phone:req.body.phone,
        email: req.body.email,
        password: req.body.password,
        img:req.body.img,
        adminAgree:req.body.adminAgree,
        yearsOfExperience:req.body.yearsOfExperience,
        description: req.body.description,
        medicineLicense:req.body.medicineLicense,
        address:req.body.address,
        specialtie: req.body.specialtie
    }, { new: true }).then((doctor) => {
      if (!doctor) {
        return res.status(404).send({
          message: 'doctor not found.'
        });
      }
  
      res.send(doctor);
    }).catch((error) => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'doctor not found.'
        });
      }
  
      res.status(500).send({
        message: error.message || 'Failed to update doctor.'
      });
    });
  });
  
  // Delete a doctor by id
  app.delete('/doctors/:id', (req, res) => {
    Doctor.findByIdAndDelete(req.params.id)
    .then((doctor) => {
      if (!doctor) {
        return res.status(404).send({
          message: 'doctor not found.'
        });
      }
      res.send({
        message: 'doctor deleted successfully'})
      })
      .catch((error) => {
          if (error.kind === 'ObjectId' || error.name === 'NotFound') {
          return res.status(404).send({
          message: 'doctor not found.'
          });
          }
          res.status(500).send({
              message: error.message || 'Failed to delete doctor.'
            });
          });
      
  })
module.exports = app;
