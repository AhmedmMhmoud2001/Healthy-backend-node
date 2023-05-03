const mongoose = require('mongoose');
const SpecialtieSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true ,
        unique: true
        },
    img:{
        type: String,
        required: true
       }
});
const Specialtie = mongoose.model('specialtie',SpecialtieSchema)
module.exports = Specialtie