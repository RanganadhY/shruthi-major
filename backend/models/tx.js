const mongoose = require("mongoose");


const txSchema = new mongoose.Schema({
    hash:{
        type:String
    },
    amount:{
        type:Number
    },
    dateOfTx:{
        type:Date
    },
    userName:{
        type:String
    },
    gasFee:{
        type:Number
    }
})

module.exports = mongoose.model("txSchema",txSchema);