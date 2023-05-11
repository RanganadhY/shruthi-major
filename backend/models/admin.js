const mongoose = require("mongoose")
const txSchema = new mongoose.Schema({
    txHash:{
        type:String
    },
    gasFee:{
        type:String
    },
    dateOfTx:{
        type:Date
    },
    txAmount:{
        type:Number
    }
})
const donationRequestSchema = new mongoose.Schema({
    requestNumber:{
        type:Number
    },
    recepientMetamaskAddress:{
        type:String
    },
    requestedAmount:{
        type:String
    },
    requestReason:{
        type:String
    },
    requestedDate:{
        type:Date
    },
    requestStatus:{
        type:String,
    },
    recepientUserName:{
        type:String
    }
})
const adminSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        sparse:true
    },
    password:{
        type:String
    },
    metamaskAddress:{
        type:String
    },
    txsHistory:[txSchema],
    donationRequests:[donationRequestSchema]
})

module.exports = mongoose.model("adminSchema",adminSchema)