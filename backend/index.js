const express = require("express");
const cors = require("cors");
require("./jobs/votingDisable")
const authRoutes = require("./routes/authRoutes");
const txRoutes = require("./routes/txRoutes");
const recepientRoutes = require("./routes/recepientRoutes");
const adminRoutes = require("./routes/adminRoutes")
const donorRoutes = require("./routes/donorRoutes")
const votingRoutes = require("./routes/votingRoutes")
// const idVerificationRoutes = require("./routes/idverification")

const app = express();
const port =3001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





const panNoModel = require("./models/panCardDetails");
app.post("/addPanNo",async(req,res)=>{
    const {panNo,userName} = req.body;
    try{
        const response = await panNoModel.create({
            panNo,
            userName
        })
        return res.status(200).json({"message":"added sucessfully"})
    }
    catch(e){
        console.log(e)
    }
})
app.use("/auth",authRoutes);
app.use("/api/tx/",txRoutes);
app.use("/api/recepient/",recepientRoutes);
app.use("/api/admin/",adminRoutes)
app.use("/api/donor/",donorRoutes)
app.use("/api/voting/",votingRoutes)

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ranganadhyadlapalli:135790@cluster0.xoait.mongodb.net/shruthimajor?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error",(error)=>console.log(error))
db.once("open",()=>console.log("Connected to Database"));
app.listen(port,()=>{
    console.log("server running on port " + port);
});
