const mongoose = require("mongoose")
const bcrypt = require('bcrypt');

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
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true 
    }
})

// we are doing this because we want to generate a hashed password with the help of bcrypt
// pre is a middileware provided by mongoose, functions which are passed control during execution of asynchronous functions.
personSchema.pre('save', async function(next){
    const person = this;
    // generate hash password only if it has been modified
    if(!person.isModified('password')) return next();
    try{
        // hash password being generated
        const salt = await bcrypt.genSalt(10)

        // hash password    
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;

        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch; 
    } catch (error) {
        throw err;
    }
}


const Person = mongoose.model('Person', personSchema)
module.exports = Person