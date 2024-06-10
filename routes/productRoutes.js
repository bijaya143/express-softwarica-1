const router = require('express').Router()
const productControllers = require('../controllers/productControllers.js')
const authGuard = require('../middleware/authGuard.js')

router.post('/create', 
productControllers.createProduct
)

router.get('', authGuard,
productControllers.getProducts
)

router.get('/:id', productControllers.getProduct)

router.delete('/:id', productControllers.deleteProduct)

router.patch('/:id', productControllers.updateProduct)

module.exports = router