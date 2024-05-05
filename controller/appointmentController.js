
const appointmentModel = require("../model/appointmentModel");

const bookAppointment = async (req, res) => {
  console.log(req.body);

  const { date, time } = req.body;

  if (!date || !time) {
    return res.json({
      success: false,
      message: "Please enter all fields!",
    });
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  const timeRegex = /^\d{2}:\d{2}$/;

  if (!dateRegex.test(date) || !timeRegex.test(time)) {
    return res.json({
      success: false,
      message: "Please enter in correct format",
    });
  }

  const currentDate = new Date()
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");
  if (currentDate > date) {
    return res.json({
      success: false,
      message: "Please enter future date",
    });
  }

  if (time == "15:00") {
    return res.json({
      success: false,
      message: "The slot is unavailable",
    });
  }

  try {
    const existingAppointment = await appointmentModel.findOne({
      date: date,
      time: time,
    });

    if (existingAppointment) {
      return res.json({
        success: false,
        message: "Appointment Slot Unavailable",
      });
    }

    const newAppointment = new appointmentModel({
      date: date,
      time: time,
    });

    await newAppointment.save();

    return res.json({
      success: true,
      message: "Confirm booking",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  bookAppointment,
};


