const DonorModel = require("../models/donors");
const AdminModel = require("../models/admin.js");
const RecepientModel = require("../models/recepient")

const getTxHistory = async(req,res)=>{
    try{
        const {userType,userName} = req.params;
        if(userType ==="001"){
            const response = await AdminModel.findOne({"userName":userName})
            return res.status(200).json({"txHistory":response.txsHistory})
        }
        if(userType ==="002"){
            const response = await DonorModel.findOne({"userName":userName})
            return res.status(200).json({"txHistory":response.txsHistory})
        }
        else if(userType ==="003"){
            const response = await RecepientModel.findOne({"userName":userName})
            return res.status(200).json({"txHistory":response.txsHistory})
        }

    }catch(e){
        console.log(e)
        res.status(500).json({"message":"Something went wrong"})
    }
}

const addTx = async(req,res)=>{
    try{
        const {userType,userName,txHash,gasFee,txAmount,dateOfTx} = req.body;
        const query = {"userName":userName};
        const update = {
            $push:{"txsHistory":{
                txHash,
                gasFee,
                txAmount,
                dateOfTx
            }
        }}
        if(userType ==="001"){
            const response = await AdminModel.updateOne(query,update)
            return res.status(200).json({"txHistory":response.txsHistory})
        }
        if(userType ==="002"){
            const response = await DonorModel.updateOne(query,update)
            return res.status(200).json({"txHistory":response.txsHistory})
        }
        else if(userType ==="003"){
            const response = await RecepientModel.updateOne(query,update)
            return res.status(200).json({"txHistory":response.txsHistory})
        }
    }
    catch(e){

    }
}

module.exports.getTxHistory = getTxHistory;
module.exports.addTx = addTx;