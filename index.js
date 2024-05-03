// importing
const express = require("express")
const dotenv = require('dotenv');
const connectDatabase = require("./database/database");


//creating express app
const app = express();

//express json config
app.use(express.json())

dotenv.config();

//defing port
const PORT = process.env.PORT;

// Connecting to database
connectDatabase();

// configuring Routes of User
app.use('/api/contact', require('./routes/contactRoutes'))
app.use('/api/reservation', require('./routes/reservationRoutes'))

//making test endpoint
app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT}!`)
})

