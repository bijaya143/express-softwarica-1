const router = require('express').Router()
const userControllers = require('../controllers/userControllers.js')

// Make a create user API
router.post('/create-user', 
    userControllers.createUser
)

router.post('/login', 
    userControllers.login
)

module.exports = router