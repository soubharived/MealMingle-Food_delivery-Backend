const mongoose = require("mongoose")

const {Schema} = mongoose;

const UserSchema =new Schema({
    name:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    email:{
        type: String,
        Required: true

    }, 
    password:{
        type: String,
        Required: true
    },
    date:{
        type: Date,
        default:Date.now
    }

})
module.exports= mongoose.model('user', UserSchema)