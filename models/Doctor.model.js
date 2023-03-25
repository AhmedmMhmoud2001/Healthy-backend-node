const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
      },
    lastname: {
        type: String,
        required: true,
      },
    phone: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true,
        unique: true
      },
    password: {
        type: String,
        required: true
      },
    img:{
        type: String,
      },
    adminAgree:{
        type: Boolean, 
        default: false, 
        required: true 
      },
    yearsOfExperience:{
        type:Number,
        required: true
      },
    description: {
        type: String,
        required: true
      },
    medicineLicense:{
        type: String,
        required: true
      },
    address:{
        type: String,
        required: true
      },
    specialtie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'specialtie'
      },
    createdAt: {
        type: Date,
        default: Date.now
      }, 
      socketId: {
        type: String,
        required: true,
      }
  });
  const Doctor = mongoose.model('doctor', DoctorSchema);
module.exports = Doctor;
