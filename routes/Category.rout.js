// const upload =require('./rout.upload')
const { Router } = require('express');
const app = Router();
const CategoryController =require('../controllers/Category.controller')


// Create a new Category

// upload.single("img")
app.post('/categories',CategoryController.createCategory);

// Retrieve all categories
app.get('/categories', CategoryController.ReadallCategory);

// Retrieve a single category by id
app.get('/categories/:id', CategoryController.ReadCategorybyid);
  
// Update a category by id
app.put('/categories/:id', CategoryController.UpdateCategorybyid);

// Delete a Category by id
app.delete('/categories/:id', CategoryController.DeleteCategorybyid);

module.exports = app;