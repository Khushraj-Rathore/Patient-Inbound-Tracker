const mongoose = require("mongoose");
const initdata = require("./data.js");
const Patient = require("../models/patient.js");

async function main() { 
    await mongoose.connect('mongodb://127.0.0.1:27017/patienttracker');
};


main().then(()=>{
    console.log("connect");
    }).catch((err)=>{ 
    console.log(err); 
});

const initDB= async()=>{
    await Patient.deleteMany({});
    await Patient.insertMany(initdata.data);
};

initDB();