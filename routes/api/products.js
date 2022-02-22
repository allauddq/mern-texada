// Load modules
const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

// Initialize router


// @route GET api/products
// @description Get all products
// @access Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) throw Error('No products');
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route GET api/products/:id
// @description Get single product by id
// @access Public
router.get('/:id', async(req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    if (!products) throw Error('No products');
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route POST api/products
// @description add/save product
// @access Public
router.post('/', async (req, res) => {
  const newProduct = new Product({
    id: req.body.id,
    description: req.body.description,
    datetime: req.body.datetime,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    elevation: req.body.elevation
  });

  try {
    const product = await newProduct.save();
    if (!product) throw Error('Something went wrong saving the product');

    res.status(200).json(product);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// @route PUT api/products/:id
// @description Update product
// @access Public
router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(product => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route DELETE api/products/:id
// @description Delete product by id
// @access Public
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw Error('No product found');

    const removed = await product.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the product');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

module.exports = router;