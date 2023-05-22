
// Require schema 
const Product = require("../models/product");

// Add product
exports.addProduct = async (req, res) => {
  try {
    const {category,id,title, description  } = req.body;
    const newProduct = new Product({ category,id,title , rate, description,prix ,posterUrl ,createdAt ,createdBy: req.user});
    await newProduct.save();
    res.status(200).send({ msg: "Product added successfully ! ", newProduct });
  } catch (error) {
    res.status(400).send({ error: "Error saving product", error });
  }
};

// Get all product 
exports.getProducts = async (req, res) => {
  try {
    const Products = await Product.find({})
    .sort({ createdAt: -1 })
    .populate("createdBy", "_id name");
    res.status(200).send(Products);
  } catch (error) {
    res.status(400).send({ error: "Error retrieving products", error });
  }
};

// Get product by id 
exports.getProductsById = async (req, res) => {
  try {
    const { _id } = req.params;
    const product = await Product.findById({ _id });

    if (!product) {
      res.status(400).send({ error: "Product not found", error });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: "Error product by id", error });
  }
};

// Get products by category 
exports.getProductByCategory = async (req, res, next) => {
  const category = req.params.category;
  try {
    const products = await Product.find({ category: category }).exec();
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};


// Delete product
exports.deleteProducts = async (req, res) => {
  try {
    const { _id } = req.params;
    await Product.findByIdAndDelete({ _id });
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Error deleting product", error });
  }
};

// Update product
exports.updateProducts = async (req, res) => {
  try {
    const { _id } = req.params;
    const newProduct = req.body;
    await Product.updateOne({ _id }, { $set: newProduct });
    res.status(200).send({ message: "Product updated successfully" });
  } catch (error) {
    res.status(400).send({ error: "Error updating product", error });
  }
};

// Get products by user ID
exports.getProductsByUserId = async (req, res, next) => {
  try {
    const products = await Connect.find({ createdBy: req.params._id });
    res.status(200).send(products);
  } catch (err) {
    next(err);
  }
};