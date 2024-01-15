const router = require("express").Router();
const {User, validate} = require("../models/user")
const bcrypt = require("bcrypt");
router.post("/", async(req, res) => {
    try{
        // Validating user inputs
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message});

        // Checking for duplicate user
        const user = await User.findOne({email: req.body.email});

        if(user)
                return res.status(409).send({message: "User with given email already exist!"});

        // Hashing the password using bcrypt
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        
        // Modifying the old password with hashed password
        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "User created successfully!"});
    }catch(e){
        res.status(500).send({message: "Internal Server Error"})
    }
})

module.exports = router;