const Product = require('../models/Pruduct.model')

const CreateProduct = (req, res) => {
    const product = new Product({
     title:req.body.title,
     description:req.body.description,
     price:req.body.price,
     count:req.body.count,
     img:req.body.img,
     rating:req.body.rating,
     category:req.body.category
    });
  
    product.save().then(() => {
      res.send(product);
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Failed to create product.'
      });
    });
 }
const ReadAllProduct =(req, res) => {
    Product.find().then((products) => {
      res.send(products);
    }).catch((error) => {
      res.status(500).send({
        message: error.message || 'Failed to retrieve Product.'
      });
    });
}
const ReadOneProduct = (req, res) => {
    Product.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: 'Product not found.'
        });
      }
      res.send(product);
    })
    .catch((error) => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'product not found.'
        });
      }
  
      res.status(500).send({
        message: error.message || 'Failed to retrieve product.'
      });
    });
  }
const ReadAllProductInOneCategory=async (req, res, next) => {
    try {
      const products = await Product.find({ category: req.params.category  })
        .exec();
        res.json(products);
    } catch (err) {
      next(err);
    }
    }
const UpdateOneProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        count:req.body.count,
        img:req.body.img,
        rating:req.body.rating,
        category:req.body.category
    }, { new: true }).then((product) => {
      if (!product) {
        return res.status(404).send({
          message: 'product not found.'
        });
      }
  
      res.send(product);
    }).catch((error) => {
      if (error.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'product not found.'
        });
      }
  
      res.status(500).send({
        message: error.message || 'Failed to update product.'
      });
    });
  }
const DeleteOneProduct=(req, res) => {
    Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: 'User not found.'
        });
      }
      res.send({
        message: 'User deleted successfully'})
      })
        .catch((error) => {
          if (error.kind === 'ObjectId' || error.name === 'NotFound') {
          return res.status(404).send({
          message: 'product not found.'
          });
          }
          res.status(500).send({
              message: error.message || 'Failed to delete product.'
            });
          });
  }
module.exports ={CreateProduct,ReadAllProduct ,ReadOneProduct,ReadAllProductInOneCategory,UpdateOneProduct,DeleteOneProduct}