const Article = require('../models/Article.model')
// Article
const CreateArticle =async (req, res) => {
    try {
      const article = new Article(req.body);
      await article.save();
      res.status(201).json(article);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
const ReadAllArtice = async (req, res) => {
    try {
      const articles = await Article.find();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
const ReadOneArticle = async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) throw new Error('Article not found');
      res.json(article);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
const UpdateArticlePut =async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) throw new Error('Article not found');
  
      // Update the article fields with the request body
      article.title = req.body.title;
      article.summary = req.body.summary;
      article.img = req.body.img;
      article.paragraph = req.body.paragraph;
  
      await article.save();
      res.json(article);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
const UpdateArticlepatch =async (req, res) => {
    try {
      const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!article) throw new Error('Article not found');
      res.json(article);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
const DeleteArticle = async (req, res) => {
    try {
      const article = await Article.findByIdAndDelete(req.params.id);
      if (!article) throw new Error('Article not found');
      res.json({ message: 'Article deleted' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
//   Paragraphs
const CreateArticleParagraphs = async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) throw new Error('Article not found');
  
      // Create a new paragraph object using the request body
      const paragraph = {
        title: req.body.title,
        summary: req.body.summary
      };
  
      // Add the new paragraph to the article's "paragraph" array
      article.paragraph.push(paragraph);
  
      await article.save();
      res.json(article);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
const ReadOneArticeAllParagraphs =async (req, res) => {
    try {
      const article = await Article.findById(req.params.articleId);
      if (!article) throw new Error('Article not found');
  
      const paragraphs = article.paragraph;
      res.json(paragraphs);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
const ReadOneArticleOneParagraphs = async (req, res) => {
    try {
      const article = await Article.findById(req.params.articleId);
      if (!article) throw new Error('Article not found');
  
      const paragraph = article.paragraph.id(req.params.paragraphId);
      if (!paragraph) throw new Error('Paragraph not found');
  
      res.json(paragraph);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
const UpdateArticlePutParagraphs =async (req, res) => {
    try {
      const article = await Article.findById(req.params.articleId);
      if (!article) throw new Error('Article not found');
  
      const paragraph = article.paragraph.id(req.params.paragraphId);
      if (!paragraph) throw new Error('Paragraph not found');
  
      paragraph.title = req.body.title;
      paragraph.summary = req.body.summary;
  
      await article.save();
      res.json(paragraph);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
const DeleteArticleParagraphs =async (req, res) => {
    try {
      const article = await Article.findById(req.params.articleId);
      if (!article) throw new Error('Article not found');
  
      const paragraph = article.paragraph.id(req.params.paragraphId);
      if (!paragraph) throw new Error('Paragraph not found');
  
      paragraph.deleteOne(req.params.paragraphId);
      await article.save();
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  module.exports={CreateArticle,ReadAllArtice,ReadOneArticle,UpdateArticlePut
    ,UpdateArticlepatch,DeleteArticle ,CreateArticleParagraphs,ReadOneArticeAllParagraphs
,ReadOneArticleOneParagraphs ,UpdateArticlePutParagraphs,DeleteArticleParagraphs}