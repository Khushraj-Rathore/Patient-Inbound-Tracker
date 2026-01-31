const mongoose = require("mongoose");
const phoneSchema = require("./phone.js");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    dob:{
        type:Date,
    },
    phones:[phoneSchema],
    email:{
        type:String,
    },
    medicalAlerts:{
        type:String,
    },
},
    {
    timestamps:true
    }
);

const Patient = mongoose.model("Patient",patientSchema);
module.exports= Patient;