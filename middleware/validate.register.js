// Registration validation middleware
const User = require('../models/User.model')

const  validateRegistration= async(req, res, next) => {
    const { firstname,lastname,phone, email, password,confirmpassword} = req.body;
  
  
  // Trim whitespace from form fields
  //  firstname = firstname.trim();
  //  lastname = lastname.trim();
  //  phone = phone.trim();
  //  email = email.trim();
  //  password = password.trim();
  
    const errors = {};
    const user = await User.findOne({ email });
    // First name validation
    if (!firstname) {
      errors.firstname = 'Please enter your first name';
    }
  
    // Last name validation
    if (!lastname) {
      errors.lastname = 'Please enter your last name';
    }
  
    // Phone number validation
    if (!phone) {
      errors.phone = 'Please enter your phone number';
    } else if (!/^[0-9]{11}$/.test(phone)) {
      errors.phone = 'Please enter a valid 11-digit phone number';
    }
  
    // Email validation
    if (!email) {
      errors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }else if (user) {
      errors.email = 'email is Existing ';
    }
  
  
    // Password validation
    if (!password) {
      errors.password = 'Please enter a password';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (password !== confirmpassword) {
      errors.confirmpassword = 'Please enter a password equal confirmpassword';
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }
  
    next();
     }

     module.exports= validateRegistration;