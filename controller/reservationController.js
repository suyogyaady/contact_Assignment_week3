
const reservationModel = require("../model/reservationModel");

const addReservation = async (req, res) => {
  console.log(req.body);

  const { userId, eventDate, numberOfGuests } = req.body;

  if (!userId || !eventDate || !numberOfGuests) {
    return res.json({
      success: false,
      message: "Please enter all fields!",
    });
  }

  if (numberOfGuests < 0) {
    return res.json({
      success: false,
      message: "Please enter positive guests no.",
    });
  }

  var currentDate = new Date();
  var date = new Date(eventDate);
  // console.log(currentDate);
  if (currentDate > date) {
    return res.json({
      success: false,
      message: "Please enter correct date",
    });
  }

  try {
    const newReservation = new reservationModel({
      userId: userId,
      eventDate: date,
      numberOfGuests: numberOfGuests,
    });

    await newReservation.save();

    return res.json({
      success: true,
      message: `User: ${userId} has reserved event for ${numberOfGuests} guests at date ${date} `,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addReservation,
};


