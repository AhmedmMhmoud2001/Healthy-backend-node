const Specialtie = require('../models/Specialtie.model')

const CreateSpeialtie=(req, res) => {
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
 }
const ReadAllSpeialtie=(req, res) => {
    Specialtie.find().then((specialties) => {
      res.send(specialties);
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Failed to retrieve specialties.'
      });
    });
 }
const ReadOneSpeialtie=(req, res) => {
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
  }
const UpdateOneSpeialtie=(req, res) => {
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
  }
const DeleteOneSpeialtie= (req, res) => {
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
  }


module.exports={CreateSpeialtie,ReadAllSpeialtie,ReadOneSpeialtie,UpdateOneSpeialtie,DeleteOneSpeialtie}