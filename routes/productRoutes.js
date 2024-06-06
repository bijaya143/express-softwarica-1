const router = require('express').Router()
const productControllers = require('../controllers/productControllers.js')

router.post('/create', 
productControllers.createProduct
)

router.get('', 
productControllers.getProducts
)

router.get('/:id', productControllers.getProduct)

router.delete('/:id', productControllers.deleteProduct)

module.exports = router