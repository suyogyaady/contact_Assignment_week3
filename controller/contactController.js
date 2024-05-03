const contactModel=require('../model/contactModel')

const createContact = async (req, res) => {
    console.log(req.body);

    const{name, phone, email} = req.body;

    // check validation
    if (!name || !phone || !email ) {
        // res.send("Please enter all fields!")
        return res.json({
            "success": false,
            "message": "Pleasse enter all fields!"
        })
    }

    try {

        // 5. Check if the user is already registered
        const existingContact = await contactModel.findOne({ email: email })

        // 5.1 if user found: Send response 
        if (existingContact) {
            return res.json({
                "status": false,
                "message": "Contact Already Exists!"
            })
        }

        // // Hashing/Encryption of the password
        // const randomSalt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(password, randomSalt)


        // 5.2 if user is new:

        const newContact = new contactModel({
            //Database Fields  : Client's Value
            name: name,
            phone: phone,
            email: email,
        })

        // Save to database
        await newContact.save()

        // send the respose
        res.json({
            "success": true,
            "message": `Contact ${name} Created Successfully!`
        })

        // 5.2.1 Hash the password
        // 5.2.2 Save to the database
        // 5.2.3 Send Successful response

    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message": "Internal server Error!"
        })
    }

};
module.exports = {
    createContact,
};