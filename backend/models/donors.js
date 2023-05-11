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
    }
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
    txsHistory:[txSchema]
})
module.exports=mongoose.model("donorsSchema",donorsSchema);