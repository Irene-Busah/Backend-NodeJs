const express = require('express')
const { getProducts, getProduct, createProduct, updateProduct, removeProduct } = require('../controller/productController')

const router = express.Router()


router.get('/', getProducts)

router.get('/:id', getProduct)

router.post('/', createProduct)

router.put('/:id', updateProduct)

router.delete('/:id', removeProduct)

module.exports = router;
