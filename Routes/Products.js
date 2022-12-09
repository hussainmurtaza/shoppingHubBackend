const express = require('express')
const {getAllProduct, addProduct, getProductById} = require('../Controllers/Products')
const {protect} = require('../Middlewares/protect')
const router = express.Router()

router.get('/', getAllProduct)
router.get('/:id', getProductById)
router.post('/', addProduct)


module.exports = router