const Product = require('../models/Pruduct.model')
const { Router } = require('express');
const app = Router();
const ProductController=require('../controllers/Product.controller')



  // Create a new product
  app.post('/products',  ProductController.CreateProduct);

  // Retrieve all products
  app.get('/products', ProductController.ReadAllProduct);

  // Retrieve a single product by id
  app.get('/products/:id', ProductController.ReadOneProduct);

  // ReadAllProductInOneCategory
  app.get('/products/category/:category', ProductController.ReadAllProductInOneCategory);

  // Update a product by id
  app.put('/products/:id', ProductController.UpdateOneProduct);
  
  // Delete a product by id
  app.delete('/products/:id', ProductController.DeleteOneProduct);

  module.exports = app;