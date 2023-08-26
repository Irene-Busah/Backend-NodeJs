// Product Controller
const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')


// gets all the products from the database
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500)
        throw new Error(error.message);
        // res.status(500).json({ message: error.message });
    }
})

// gets a single product
const getProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500)
        throw new Error(error.message);
        // res.status(500).json({ message: error.message });
    }
})

// create a new product
const createProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        res.status(500)
        throw new Error(error.message);
        // console.log(error.message)
        // res.status(500).json({ message: error.message })
    }
})

// updates an existing product
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({ message: `Product with id ${id} cannot be found` })
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500)
        throw new Error(error.message);
        // res.status(500).json({ message: error.message })
    }
})

// deletes a product
const removeProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `Product ${id} not found` });
        }
        res.status(200).json({ message: `Product ${product.name} deleted` });
    } catch (error) {
        res.status(500)
        throw new Error(error.message);
        // res.status(500).json({ message: error.message });
    }
})

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct
};