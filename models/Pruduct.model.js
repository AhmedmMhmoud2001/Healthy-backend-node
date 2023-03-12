const mongoose = require('mongoose');
const pruductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true,
        min: 0
      },
      count: {
        type: Number,
        required: true,
        min: 0
      },
      img: [{
        type: String,
        required: true
      }],
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
      },
      category: { type: mongoose.Schema.Types.ObjectId,
         ref: 'category'
      }
      
  });
  const Product = mongoose.model('product', pruductSchema);
module.exports = Product;