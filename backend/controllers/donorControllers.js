const { json } = require("express")
const donationRequestsModel = require("../models/donationsRequests")
const donorModel = require("../models/donors")

const getTotalDonors = async(req,res)=>{
    try{
        const response = await donorModel.find()
        console.log(response)
        return res.status(200).json({"donorsCount":response.length})
    }catch(e){
        console.log(e)
        return res.status(500),json({"message":"Something went wrong"})
    }
}
const getDonationRequests = async(req,res)=>{
    try{
        const response = await donationRequestsModel.find({voitingEligible:true})
        res.status(200).json({"donationRequests":response})
    }catch(e){
        console.log(e)
        return res.status(500),json({"message":"Something went wrong"})
    }
}
const getDonationDetails = async(req,res)=>{
    try{
        const {requestNumber} = req.params;
        const response = await donationRequestsModel.findOne({requestNumber})
        return res.status(200).json({"donationDetails":response})
    }catch(e){
        console.log(e)
        return res.status(500),json({"message":"Something went wrong"})
    }
}
const saveDonationDetails = async(req,res)=>{
    try{
        const {userName,requestNumber,recivedAmount,recivedMetamaskAddr} = req.body;
        let updateQuery = {
            $push:{
                recivedTxDetails:{
                        recivedAmount,
                        recivedMetamaskAddr,
                        userName
                    },
                    donatedDonors:userName
            }
        }
        const response = await donationRequestsModel.findOneAndUpdate({requestNumber},updateQuery)
        return res.status(200).json({"Message":response})
    }catch(e){
        console.log(e)
        return res.status(500),json({"message":"Something went wrong"})
    }
}

module.exports.getDonationRequests = getDonationRequests;
module.exports.getTotalDonors = getTotalDonors
module.exports.getDonationDetails = getDonationDetails
module.exports.saveDonationDetails =saveDonationDetails;