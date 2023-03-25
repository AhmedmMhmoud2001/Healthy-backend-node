const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
  img: {
    type: String,
  },
  // socketId: {
  //   type: String,
  //   required: true,
  // },
  // role: {
  //   type: String,
  //   enum: ['user', 'doctor', 'admin'],
  //   default: 'user'
  // },
  
  isAdmin: { type: Boolean, default: false, required: true },
  isDoctor: { type: Boolean, default: false, required: true },
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('user', userSchema);
module.exports = User;