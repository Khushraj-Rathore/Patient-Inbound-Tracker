const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Patient = require("./patient.js");

const visitSchema = new Schema({
    patientID:{
        type:Schema.Types.ObjectId,
        ref:"Patient",
    },
    visitDate:{
        type:Date,
        default:Date.now,
    },
    visitType:{
        type:String,
        enum:["walk-in","appointment"],
    },
    status:{
        type:String,
        enum:["checked-in","with_provider","completed","no-show"],
    },
    reason:{
        type:String,
    },
    checkInAt:{
        type:Date,
        default:Date.now
    },
    startedAt:Date,
    completedAt:Date,
},
    {
        timestamps:true,
    },
);

module.exports=mongoose.model("Visit",visitSchema);
