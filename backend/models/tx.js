const mongoose = require("mongoose");


const txSchema = new mongoose.Schema({
    hash:{
        type:String
    },
    amount:{
        type:Number
    }
})

module.exports = mongoose.model("txSchema",txSchema);