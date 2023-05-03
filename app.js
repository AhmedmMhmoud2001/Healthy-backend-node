const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

const cors = require('cors');
// enable CORS
app.use(cors());


// rout
const Userrout = require('./routes/User.rout')
const Productrout = require('./routes/Product.rout')
const Categoryrout = require('./routes/Category.rout')
const Specialtierout = require('./routes/Specialtie.rout')
const Articlerout = require('./routes/Article.rout')
const Doctorrout = require('./routes/Doctor.rout')
const Messagerout =require('./routes/Message.rout')


app.use(Userrout)
app.use(Productrout)
app.use(Categoryrout)
app.use(Specialtierout)
app.use(Doctorrout)
app.use(Articlerout)
app.use(Messagerout)

module.exports = app;