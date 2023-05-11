const mongoose = require("mongoose");

const panNoSchema = new mongoose.Schema({
    userName:{
        type:String
    },
    panNo:{
        type:String
    }
})

module.exports = mongoose.model("panNoSchema",panNoSchema)