const router = require('express').Router();
const userController = require('../controller/contactController')

// Creating user registration route
router.post('/create', userController.createContact)


// exporting the router
module.exports = router

