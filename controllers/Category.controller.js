const Category = require('../models/Category.model')

const createCategory =(req, res) => {
    const category = new Category({
     title:req.body.title
    });
    category.save().then(() => {
      res.send(category);
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Failed to create category.'
      });
    });
 }
const ReadallCategory = (req, res) => {
    Category.find().then((categories) => {
      res.send(categories);
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Failed to retrieve categories.'
      });
    });
}
const ReadCategorybyid = (req, res) => {
    Category .findById(req.params.id).then((category ) => {
      if (!category ) {
        return res.status(404).send({
          message: 'category  not found.'
        });
      }
      res.send(category );
    }).catch((error) => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'category  not found.'
        });
      }


  
      res.status(500).send({
        message: error.message || 'Failed to retrieve category .'
      });
    });
  }
const UpdateCategorybyid = (req, res) => {
    Category.findByIdAndUpdate(req.params.id, {
        title:req.body.title,
        img:req.body.img,
    }, { new: true }).then((category) => {
      if (!category) {
        return res.status(404).send({
          message: 'category not found.'
        });
      }
  
      res.send(category);
    }).catch((error) => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'category not found.'
        });
      }
      res.status(500).send({
        message: error.message || 'Failed to update category.'
      });
    });
  }
const DeleteCategorybyid= (req, res) => {
    Category.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (!category) {
        return res.status(404).send({
          message: 'Category not found.'
        });
      }
      res.send({
        message: 'Category deleted successfully'})
      })
        .catch((error) => {
          if (error.kind === 'ObjectId' || error.name === 'NotFound') {
          return res.status(404).send({
          message: 'category not found.'
          });
          }
          res.status(500).send({
              message: error.message || 'Failed to delete category.'
            });
          });
      }
module.exports={createCategory,ReadallCategory,ReadCategorybyid,UpdateCategorybyid,DeleteCategorybyid}