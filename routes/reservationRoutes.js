const router = require('express').Router();
const reservationController = require('../controller/reservationController')

// Creating user registration route
router.post('/add', reservationController.addReservation)


// exporting the router
module.exports = router

