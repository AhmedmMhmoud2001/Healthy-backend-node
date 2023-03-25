const { Router } = require('express');
const app = Router();
const ArticleController=require('../controllers/Article.controller')

// Create a new article
app.post('/articles',ArticleController.CreateArticle);

// Get all articles
app.get('/articles', ArticleController.ReadAllArtice);

// Get a single article by ID
app.get('/articles/:id',ArticleController.ReadOneArticle);

// Update an existing article by ID
app.patch('/articles/:id',ArticleController.UpdateArticlepatch);

// Update an existing article by ID
app.put('/articles/:id',ArticleController.UpdateArticlePut);


  // Delete an existing article by ID
app.delete('/articles/:id',ArticleController.DeleteArticle);


// crud for   paragraphs


  app.post('/articles/:id/paragraphs',ArticleController.CreateArticleParagraphs);

  app.get('/articles/:articleId/paragraphs',ArticleController.ReadOneArticeAllParagraphs);

  app.get('/articles/:articleId/paragraphs/:paragraphId',ArticleController.ReadOneArticleOneParagraphs);

  app.put('/articles/:articleId/paragraphs/:paragraphId',ArticleController.UpdateArticlePutParagraphs);

  app.delete('/articles/:articleId/paragraphs/:paragraphId', ArticleController.DeleteArticleParagraphs);



 module.exports = app;