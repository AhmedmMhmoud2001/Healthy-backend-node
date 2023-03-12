const Specialtie = require('../models/Specialtie.model')
const { Router } = require('express');
const app = Router();


// Create a new specialtie
app.post('/specialties', (req, res) => {
    const specialtie = new Specialtie({
     title:req.body.title,
     img:req.body.img,
    });
  
    specialtie.save().then(() => {
      res.send(specialtie);
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Failed to create specialtie.'
      });
    });
 });
// Retrieve all specialties
app.get('/specialties', (req, res) => {
    Specialtie.find().then((specialties) => {
      res.send(specialties);
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Failed to retrieve specialties.'
      });
    });
});

// Retrieve a single specialtie by id
app.get('/specialties/:id', (req, res) => {
    Specialtie .findById(req.params.id).then((specialtie ) => {
      if (!specialtie ) {
        return res.status(404).send({
          message: 'specialtie  not found.'
        });
      }
  
      res.send(specialtie );
    }).catch((error) => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'specialtie  not found.'
        });
      }
  
      res.status(500).send({
        message: error.message || 'Failed to retrieve specialtie .'
      });
    });
  });
  

  // Update a specialtie by id
  app.put('/specialties/:id', (req, res) => {
    Specialtie.findByIdAndUpdate(req.params.id, {
        title:req.body.title,
        img:req.body.img,
    }, { new: true }).then((specialtie) => {
      if (!specialtie) {
        return res.status(404).send({
          message: 'specialtie not found.'
        });
      }
  
      res.send(specialtie);
    }).catch((error) => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'specialtie not found.'
        });
      }
      res.status(500).send({
        message: error.message || 'Failed to update specialtie.'
      });
    });
  });



  // Delete a specialtie by id
  app.delete('/specialties/:id', (req, res) => {
    Specialtie.findByIdAndDelete(req.params.id)
    .then((specialtie) => {
      if (!specialtie) {
        return res.status(404).send({
          message: 'specialtie not found.'
        });
      }
      res.send({message: 'specialtie deleted successfully'})
    })
        .catch((error) => {
          if (error.kind === 'ObjectId' || error.name === 'NotFound') {
          return res.status(404).send({
          message: 'specialtie not found.'
          });
          }
          res.status(500).send({
              message: error.message || 'Failed to delete specialtie.'
            });
          });
      });


 module.exports = app;