const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    email:{
        type: String,
        required : true,
        unique : true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required : true,
    },
    role:{
        type: String,
        required : true,
        enum: ["Teacher", "Student"],
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('Users' , UserSchema);

module.exports = User;