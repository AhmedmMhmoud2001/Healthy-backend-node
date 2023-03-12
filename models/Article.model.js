const mongoose = require('mongoose');

const ParagraphSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
        },
    sumary:{
        type: String,
        required: true 
    }
});

const ArticleSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
        },
    sumary:{
        type: String,
        required: true 
        },
    img:{
        type: String,
        required: true
       },
    paragraph:[ParagraphSchema]
  });
const Article = mongoose.model('article', ArticleSchema);
module.exports = Article;
