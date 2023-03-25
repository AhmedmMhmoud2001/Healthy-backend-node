const mongoose = require('mongoose');
const Category = require('./Category.model')
const productSchema = new mongoose.Schema({
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
      img: {
        type: String,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
      },
      category: {
        type: String,
      }
      
      
  });

  productSchema.pre('save', async function(next) {
    const product = this;
    if (product.isNew) {
      try {
        const category = await Category.findOneAndUpdate(
          { title: product.category },
          { $push: { products: product._id } },
          { new: true }
        );
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next();
    }
  });
  const Product = mongoose.model('product', productSchema);
module.exports = Product;