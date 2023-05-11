const authRoutes = require("../routes/authRoutes");
const donorsModel = require("../models/donors");
const recepientModel = require("../models/recepient");
const adminModel = require("../models/admin");
const panNoModel = require("../models/panCardDetails")
const donorRegisteration = async(req,res)=>{
    const {userName,password,metamaskAddress,panNo} = req.body;
    try{
        const panNoVerified = await panNoModel.findOne({userName})
        if(!panNoVerified){
            return res.status(404).json({"message":"No Pan Card with these details"})
        }
        if(panNoVerified.panNo !== panNo){
            return res.status(403).json({"message":"This Pan Crad Numer is not correct for this username"})
        }
        const donorsDetails = await donorsModel.create({
            userName,
            password,
            panNo,
            metamaskAddress

        })
        console.log(donorsDetails)
        return res.status(200).json({
            "message":"Donor Created..",
            userDetails:donorsDetails
        })
        
    }
    catch(error){
        console.log(error);
        if(error.code === 11000){
            return res.status(11000).json({"message":"Username should be uniqe"})
        }
        return res.status(500).json({"message":"Something Went Wrong"})
    }
}
const donorLogin = async(req,res)=>{
    const {userName,password} = req.body;
    try{
        const donor = await donorsModel.findOne({userName});

        if(!donor){
            return res.status(404).json({
                "message":"Donor Not Found"
            })
        }
        else if(donor.password === password){
            return res.status(200).json({
                    "message":"Donor Found",
                    userDetails:donor
                });
        }
        return res.status(401).json({"message":"Invalid Credentials"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({"message":"Something Went Wrong"})
    }
}

const recepientRegistaration = async(req,res)=>{
    const {userName,password,panNo,metamaskAddress}= req.body;
    console.log(panNo)
    try{
        const panNoVerified = await panNoModel.findOne({userName})
        console.log(panNoVerified)
        console.log(panNoVerified.panNo !== panNo)
        if(!panNoVerified){
            return res.status(404).json({"message":"No Pan Card with these details"})
        }
        
        else if(panNoVerified.panNo !== panNo){
            return res.status(403).json({"message":"This Pan Crad Numer is not correct for this username"})
        }
        const recepient = await recepientModel.create({
            userName,
            password,
            panNo,
            metamaskAddress
        })
        return res.status(200).json({
            "message":"Recepient Sucessfully created",
            "userDetails":recepient
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({"message":"Something went Wrong"})
    }
}
const recepientLogin = async(req,res)=>{
    const {userName,password} = req.body;
    try{
        const recepient= await recepientModel.findOne({userName})
        if(!recepient){
            return res.status(404).json({
                message:"Recipent Not Found"
            })
        }
        if(recepient.password !== password){
            return res.status(403).json({
                message:"Pssword is incorrect"
            })
        }
        return res.status(200).json({
            message:"Login Sucessfull",
            userDetails:recepient
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({"message":"Something went Wrong"})
    }

}

const adminRegestration = async(req,res)=>{
    const {userName,password,panNo,metamaskAddress}= req.body;
    try{
        const panNoVerified = await panNoModel.findOne({userName})
        if(!panNoVerified){
            return res.status(404).json({"message":"No Pan Card with these details"})
        }
        if(panNoVerified.panNo !== panNo){
            return res.status(403).json({"message":"This Pan Crad Numer is not correct for this username"})
        }
        const admin = await adminModel.create({
            userName,
            password,
            panNo,
            metamaskAddress
        })
        return res.status(200).json({
            "message":"admin Sucessfully created",
            "userDetails":admin
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({"message":"Something went Wrong"})
    }
}
const adminLogin = async(req,res)=>{
    const {userName,password} = req.body;
    try{
        const admin = await adminModel.findOne({userName})
        if(!admin){
            return res.status(404).json({"message":"Admin Not Found"})
        }
        if(admin.password !== password){
            return res.status(403).json({"message":"Password is Incorrect"})
        }
        return res.status(200).json({
            "message":"Login Sucessfull",
            "userDetails":admin
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({"message":"Something went Wrong"})
    }
}

module.exports.donorRegisteration = donorRegisteration;
module.exports.donorLogin = donorLogin;
module.exports.adminLogin = adminLogin;
module.exports.adminRegestration = adminRegestration;
module.exports.recepientLogin = recepientLogin;
module.exports.recepientRegistaration = recepientRegistaration;