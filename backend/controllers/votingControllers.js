const donationRequestModel = require("../models/donationsRequests")


const userElibility = async(req,res)=>{
    try{
        const {userName,requestNumber} = req.params;
        const response = await donationRequestModel.findOne({requestNumber},{votesCastedBy:{$elemMatch:{$eq:userName}}})
        if(response.votesCastedBy.length>0){
            return res.status(200).json({"eligibility":false})
        }
        else{
            return res.status(200).json({"eligibility":true})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({"message":"Something went wrong"})
    }
}
const castYes = async(req,res)=>{
    try{
        const {requestNumber,userName} = req.body;
        let updateQuery = {}
        const requestDetails = await donationRequestModel.findOne({requestNumber})
        if(((requestDetails.yesVoters+1)+requestDetails.noVoters) === (requestDetails.totalVoters)){


            if((requestDetails.yesVoters+1) >= (0.6*requestDetails.totalVoters)){
                let afterMinAmount = (requestDetails.requestedAmount)/(requestDetails.yesVoters+1);
                updateQuery = {
                    $inc:{yesVoters:1},
                    $push:{
                        approvedVoters:userName,
                        votesCastedBy:userName
                    },
                    afterMinAmount,
                    "votingResult":true
                }
            }
            else if((requestDetails.yesVoters+1) < (0.6*requestDetails.totalVoters)){
                let afterMinAmount = 0;
                updateQuery = {
                    $inc:{yesVoters:1},
                    $push:{
                        approvedVoters:userName,
                        votesCastedBy:userName
                    },
                    afterMinAmount,
                    "votingResult":false
                }
            }
            
            
        }
        else{
            updateQuery = {
                $inc:{yesVoters:1},
                $push:{
                    approvedVoters:userName,
                    votesCastedBy:userName
                }
            }

        }
        const response = await donationRequestModel.findOneAndUpdate({requestNumber},updateQuery)
        return res.status(200).json({"message":"Sucessfull"})
    }catch(e){
        console.log(e)
        res.status(500).json({"message":"Something went wrong"})
    }
}

const castNo = async(req,res)=>{
    try{
        const {requestNumber,userName} = req.body;
        let updateQuery = {}

        const requestDetails = await donationRequestModel.findOne({requestNumber})


        if(((requestDetails.yesVoters)+requestDetails.noVoters+1) === (requestDetails.totalVoters)){

            if((requestDetails.yesVoters) >= (0.6*requestDetails.totalVoters)){
                let afterMinAmount = (requestDetails.requestedAmount)/(requestDetails.yesVoters);
                console.log("1st excuted")
                updateQuery = {
                    $inc:{noVoters:1},
                    $push:{
                        approvedVoters:userName,
                        votesCastedBy:userName
                    },
                    afterMinAmount,
                    "votingResult":true
                }
            }

            else if((requestDetails.yesVoters) < (0.6*requestDetails.totalVoters)){
                console.log("2nd excuted")
                let afterMinAmount = 0;
                updateQuery = {
                    $inc:{noVoters:1},
                    $push:{
                        approvedVoters:userName,
                        votesCastedBy:userName
                    },
                    afterMinAmount,
                    "votingResult":false
                }
            }
        }
        else{
            console.log("3rd excuted")
            updateQuery = {
                $inc:{noVoters:1},
                $push:{
                    votesCastedBy:userName
                }
            }
        }
        const response = await donationRequestModel.findOneAndUpdate({requestNumber},updateQuery)
        return res.status(200).json({"message":"Sucessfull"})
    }catch(e){
        console.log(e)
        res.status(500).json({"message":"Something went wrong"})
    }
}

module.exports.userElibility= userElibility
module.exports.castYes = castYes
module.exports.castNo = castNo