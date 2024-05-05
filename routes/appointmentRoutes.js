const appointmentController = require("../controller/appointmentController");
const router = require("express").Router();

router.post("/", appointmentController.bookAppointment);

module.exports = router;