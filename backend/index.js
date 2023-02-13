const express = require("express");
const cors = require("cors");

const app = express();
const port =3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://anudeep:anudeep@cluster0.haii6bd.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error",(error)=>console.log(error))
db.once("open",()=>console.log("Connected to Database"));
const txSchema = require("./models/tx");
app.post("/store",async(req,res)=>{

    const {amount, hash} = req.body;
    const details = new txSchema({
        amount,
        hash
    })
    await details.save()
    .then(()=>{
        console.log("saved")
        res.status(200).json({
            "message":"done"
        })
    })
    .catch((err)=>{
        console.log(err)
    })

})
app.get("/gettx",async(req,res)=>{
    await txSchema.find()
    .then((result)=>{
        res.status(200).json({
            'result':result
        })
    })
})

app.listen(port,()=>{
    console.log("server running on port " + port);
});
