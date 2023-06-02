const mongoose=require("mongoose");

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
    },
    requestNumber:{
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
    requestReasonIpfsHash:{
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
    },
})
const donorsSchema=new mongoose.Schema({
    userName:{
        type:String,
        trim:true,
        unique:true,
        sparse:true
    },
    password:{
        type:String,
        trim:true
    },
    panNo:{
        type:String
    },
    metamaskAddress:[String],
    txsHistory:[txSchema],
    
})
module.exports=mongoose.model("donorsSchema",donorsSchema);