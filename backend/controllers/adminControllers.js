const AdminModel = require("../models/admin");
const RecepientModel = require("../models/recepient")

const fetchDonationRequests = async(req,res)=>{
    try{
        const response = await AdminModel.findOne({"userName":"Shruthi N"}).select("donationRequests")
        return res.status(200).json({"requestsDetails":response})
    }catch(e){
        console.log(e)
        res.status(500).json({"message":"Something went wrong"})
    }
}

const approveRequest = async(req,res)=>{
    try{
        const {requestNumber,recepientUserName,txHash,gasFee,dateOfTx,txAmount} = req.body
        const adminResponse= await AdminModel.findOneAndUpdate(
            {
                "userName":"Shruthi N",
                "donationRequests.requestNumber":requestNumber
            },
            {
                $set:{"donationRequests.$.requestStatus":"approved"},
                $push:{"txsHistory":{txHash,gasFee,dateOfTx,txAmount}}
            })

        const recResponse = await RecepientModel.findOneAndUpdate(
            {
                "userName":recepientUserName,
                "donationRequestsDetails.requestNumber":requestNumber
            },
            {
                $set:{"donationRequestsDetails.$.requestStatus":"approved"},
            })
            res.status(200).json({"message":"Sucessfull"})
    }catch(e){
        console.log(e)
        res.status(500).json({"message":"Something Went Wrong"})
    }
}

const rejectRequest= async(req,res)=>{
    try{
        const {recepientUserName,requestNumber} = req.body;
        console.log()
        const adminResponse= await AdminModel.findOneAndUpdate(
            {
                "userName":"Shruthi N",
                "donationRequests.requestNumber":requestNumber
            },
            {
                $set:{"donationRequests.$.requestStatus":"rejected"},
            })

        const recResponse = await RecepientModel.findOneAndUpdate(
            {
                "userName":recepientUserName,
                "donationRequestsDetails.requestNumber":requestNumber
            },
            {
                $set:{"donationRequestsDetails.$.requestStatus":"rejected"},
            })
            res.status(200).json({"message":"Sucessfull"})
    }catch(e){
        console.log(e)
        res.status(500).json({"message":"Something went wrong"})
    }
}

module.exports.fetchDonationRequests = fetchDonationRequests;
module.exports.approveRequest = approveRequest;
module.exports.rejectRequest =rejectRequest;