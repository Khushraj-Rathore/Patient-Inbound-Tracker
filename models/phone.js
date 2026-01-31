const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
    original:{
        type:String,
    },
    normalized:{
        type:String,
        index:true,
    }
});


module.exports=phoneSchema;