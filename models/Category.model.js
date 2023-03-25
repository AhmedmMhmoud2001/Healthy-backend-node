const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
        },
    img:{
        type: String,
        // required: true
       },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      }],
    //    subcategories: [{ 
    //     type: mongoose.Schema.Types.ObjectId,
    //      ref: 'Category' 
    //     }],
        
  });
  const Category = mongoose.model('category', CategorySchema);
module.exports = Category;