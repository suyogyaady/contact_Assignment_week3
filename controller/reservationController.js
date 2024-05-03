const reservationModel=require('../model/reservationModel')

const addReservation = async (req, res) => {
    console.log(req.body);

    const{userId, eventDate, numberOfGuests} = req.body;

    // Get the current date
    var currentDate = new Date();

    // Create a new date object for your target date
    var targetDate = new Date(eventDate);

    // check validation
    if (targetDate>currentDate & numberOfGuests < 0 ) {
        // res.send("Please enter all fields!")
        return res.json({
            "success": false,
            "message": "Error(Invalid fields)"
        })
    }
    

    try {

       
        // 5.2 if user is new:

        const newReservation = new reservationModel({
            //Database Fields  : Client's Value
            userId: userId,
            eventDate: eventDate,
            numberOfGuests: numberOfGuests,
        })

        // Save to database
        await newReservation.save()

        // send the respose
        res.json({
            "success": true,
            "message": `New reservation at ${eventDate} with ${numberOfGuests} guests reserved Successfully!`
        })

        // 5.2.1 Hash the password
        // 5.2.2 Save to the database
        // 5.2.3 Send Successful response

    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message": "Reservation details error"
        })
    }

};
module.exports = {
    addReservation,
};