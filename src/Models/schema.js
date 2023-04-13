const mongoose = require("mongoose")

const newschema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    username:{
        type:String
    },
    password:{
       type:String
    },
    confirmpassword:{
       type:String
    }
})

const schema = new mongoose.model("Hexoderz", newschema)

module.exports = schema;

