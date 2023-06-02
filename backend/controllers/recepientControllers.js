const RecepientModel = require("../models/recepient")
const AdminModel = require("../models/admin");

const donorModel = require("../models/donors")
const donationRequestsModel = require("../models/donationsRequests")

const donationRequest = async(req,res)=>{

    try{
        const {userName} = req.params
        const {requestReasonIpfsHash,recepientMetamaskAddress,requestReason,requestedDate,requestedAmount,intialMinAmount,totalVoters} = req.body;
        const randomNum = Math.floor(Math.random() * 90000) + 10000;
        // const adminUpdateQuery = {
        //     $push:{
        //         "donationRequests":{
        //             recepientMetamaskAddress,
        //             requestReason,
        //             requestedDate,
        //             requestedAmount,
        //             "requestStatus":"Pending",
        //             requestNumber:randomNum,
        //             "recepientUserName":userName
        //         }
        //     }
        // }
        
        const recepientUpdateQuery = {
            $push:{
                "donationRequestsDetails":{
                    requestReason,
                    requestedDate,
                    requestedAmount,
                    "requestStatus":"Requested Sent",
                    requestNumber:randomNum,
                    requestReasonIpfsHash
                }
            }
        }
        // const adminRes = await AdminModel.findOneAndUpdate({"userName":"Shruthi N"},adminUpdateQuery)
        const drCreationRes = await donationRequestsModel.create({
            requestReason,
            recepientMetamaskAddress,
            requestedDate,
            requestedAmount,
            requestNumber:randomNum,
            "recepientUserName":userName,
            intialMinAmount,
            voitingEligible:true,
            totalVoters ,
            requestReasonIpfsHash    
        })
        const recpRes = await RecepientModel.findOneAndUpdate({"userName":userName},recepientUpdateQuery)
        res.status(200).json({"message":"Request Sent to Admin Sucessfull"})
    }catch(e){
        console.log(e)
        res.status(500).json({"message":"Something went wrong"})
    }
}

const fetchUserRequests = async(req,res)=>{
    try{
        const {userName} = req.params;
        const response = await RecepientModel.findOne({userName}).select("donationRequestsDetails")
        return res.status(200).json({"requestsDetails":response})
    }catch(e){
        console.log(e)
        res.status(500).json({"message":"Something went wrong"})
    }
}

module.exports.donationRequest = donationRequest;
module.exports.fetchUserRequests = fetchUserRequests;