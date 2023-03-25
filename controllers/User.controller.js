const User = require('../models/User.model')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET_KEY } = process.env;

const Createregister= async(req,res)=>{
    try {
        // console.log(req.body)
        // console.log(SECRET_KEY);
        const { firstname,lastname,phone, email, password } = req.body;
        const user = new User({ firstname,lastname,phone, email, password });
        // console.log(user);
        await user.save();
        const token = jwt.sign({ userId: user._id }, SECRET_KEY);
        res.status(201).json({ token});
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}
const Createlogin =async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid login  email is not found');
      const isMatch = await user.comparePassword(password);
      if (!isMatch) throw new Error('Invalid login  password incorrect');
      const token = jwt.sign({ userId: user._id }, SECRET_KEY);
      res.status(200).json
      ({ token });
  } catch (error) {
  res.status(401).json({ error: error.message });
  }
  }
const Createuser =(req, res) => {
    const user = new User({
  firstname:req.body.firstname,
  lastname:req.body.lastname,
  phone:req.body.phone,
  email: req.body.email,
  password: req.body.password
    });
  
    user.save().then(() => {
      // res.send(user);
      const token = jwt.sign({ userId: user._id }, SECRET_KEY);
      res.status(201).json({ token });
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Failed to create user.'
      });
    });
 }
 const Readalluser =(req, res) => {
    User.find().then((users) => {
      res.send(users);
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Failed to retrieve users.'
      });
    });
  }
 const Readuserbyid =(req, res) => {
    User.findById(req.params.id).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found.'
        });
      }
  
      res.send(user);
    }).catch((error) => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found.'
        });
      }
  
      res.status(500).send({
        message: error.message || 'Failed to retrieve user.'
      });
    });
  }
const Updateuserbyid =(req, res) => {
    User.findByIdAndUpdate(req.params.id, {
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      phone:req.body.phone,
      email: req.body.email,
      password: req.body.password
    }, { new: true }).then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found.'
        });
      }
  
      res.send(user);
    }).catch((error) => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found.'
        });
      }
  
      res.status(500).send({
        message: error.message || 'Failed to update user.'
      });
    });
  }
  const Deleteuserbyid =(req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found.'
        });
      }
      res.send({
        message: 'User deleted successfully'})
      })
      .catch((error) => {
          if (error.kind === 'ObjectId' || error.name === 'NotFound') {
          return res.status(404).send({
          message: 'User not found.'
          });
          }
          res.status(500).send({
              message: error.message || 'Failed to delete user.'
            });
          });
      
  }
module.exports={Createregister,Createlogin,Createuser,Readalluser,Readuserbyid,Updateuserbyid,Deleteuserbyid}