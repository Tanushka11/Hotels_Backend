const mongoose = require("mongoose")

const personSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ["cheif","manager","owner","waiter"],
        required: true
    },
    mobileNumber:{
        type: Number,
        required: true
    },
    email : {
        type: String,
        required: false,
        unique: true
    },
    address:{
        type: String,
    },
    salary:{
     type: Number,
    }
})

const Person = mongoose.model('Person', personSchema)
module.exports = Person