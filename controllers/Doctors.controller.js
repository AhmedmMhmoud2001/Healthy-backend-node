const Doctor = require('../models/Doctor.model')
const CreateDoctor=(req, res) => {
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
 }
const ReadAllDoctor= (req, res) => {
    Doctor.find().then((doctors) => {
      res.send(doctors);
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Failed to retrieve doctors.'
      });
    });
  }
const ReadOneDoctor= (req, res) => {
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
  }
const UpdateDoctor=(req, res) => {
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
  }

const DeleteDoctor =(req, res) => {
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
      
  }

module.exports={CreateDoctor,ReadAllDoctor,ReadOneDoctor,UpdateDoctor,DeleteDoctor}