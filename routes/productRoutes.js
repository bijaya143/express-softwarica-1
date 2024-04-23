const router = require('express').Router()
const productControllers = require('../controllers/productControllers.js')

// Make a create user API
router.post('/create', 
productControllers.createProduct
)

module.exports = router