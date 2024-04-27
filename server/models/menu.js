const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price:{
        type: Number
    },
    taste:{
        type: String,
        enum:['spicy','sweet','sour'],
    },
    is_drink:{
        type: String
    },
    ingredients:{
        type: Array
    },
    numSales:{
        type: Number,
        default: 0
    }
})

const Menu = mongoose.model("Menu", menuSchema)
module.exports = Menu