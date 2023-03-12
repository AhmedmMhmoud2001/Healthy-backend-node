
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./routes/User.rout')
const Product = require('./routes/Product.rout')
const Category = require('./routes/Category.rout')
const Specialtie = require('./routes/Specialtie.rout')
const Message =require('./routes/Message.rout')

const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
// enable CORS
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(User)
app.use(Product)
app.use(Category)
app.use(Specialtie)
app.use(Message)
// MongoDB connection

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  }).then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
  

// Start the server
  app.listen(port, () => console.log(`Listening on port ${port}...`));



// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to the database!');
// }).catch((error) => {
//   console.log('Failed to connect to the database:', error);
//   process.exit();
// });


// User model
// const User = mongoose.model('User', {
//   name: String,
//   email: String,
//   password: String
// });




