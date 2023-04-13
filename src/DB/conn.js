const mongoose = require("mongoose")

const database = 'mongodb+srv://Shubham:database@cluster0.x0u5yjr.mongodb.net/agentdata?retryWrites=true&w=majority';

mongoose.connect(database).then(()=>{
    console.log("Connection Successful");
}).catch((err)=> console.log("No connection"));

module.exports = mongoose;
