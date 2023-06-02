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
const recivedTxSchema = new mongoose.Schema({
    recivedMetamaskAddr:{
        type:String,
    },
    recivedAmount:{
        type:Number
    }
},{timestamps:true})
const donationRequestsDetails = new mongoose.Schema({
    requestNumber:{
        type:Number
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
        type:String
    },
    requestReasonIpfsHash:{
        type:String
    },
    recivedTxDetails:[recivedTxSchema]
})
const recepientSchema = new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        sparse:true
    },
    password:{
        type:String,
    },
    panNo:{
        type:String
    },
    metamaskAddress:{
        type:String
    },
    txsHistory:[txSchema],
    donationRequestsDetails:[donationRequestsDetails]
})

module.exports=mongoose.model("recepientSchema",recepientSchema);