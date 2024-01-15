const mongoose = require("mongoose");

module.exports = () => {
    const connectionParams = {
        usueNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try{
        mongoose.connect(process.env.DB);
        console.log("Connected to DB successfully!")
    }catch(e){
        console.log(e);
        console.log("Couldn't connect to DB!")
    }
}