const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    // type: String,
    unique: true,
    required: true
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default:"https://ahmedmmhmoud2001.github.io/pharmacy-api/img/default-image.png"
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
    // medicineLicense:{
    //     type: String,
    //     required: true
    //   },
      language :{
        type: String,
        required: true
      },
    address:{
        type: String,
        required: true
      },
    specialtie: {
      type: String,
      required: true
      },
    createdAt: {
        type: Date,
        default: Date.now
      }, 
      // socketId: {
      //   type: String,
      //   required: true,
      // }
  });
  const Doctor = mongoose.model('doctor', DoctorSchema);
module.exports = Doctor;
