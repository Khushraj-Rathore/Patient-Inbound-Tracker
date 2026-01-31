const express = require("express");
const router = express.Router({mergeParams : true});
const Visit = require("../models/visit.js");

//Create Visit
router.get("/new",(req,res)=>{
  let {patientID} = req.query;
  res.render("visit/new.ejs",{patientID});
});

router.post("/",async(req,res)=>{
  let visit = req.body.visit;
  if (!visit.visitDate) {
  visit.visitDate = new Date();
}
  let newvisit = new Visit(visit);
  await newvisit.save();
  console.log(newvisit);
  req.flash("success","Vist Added");
  res.redirect(`/patients/${newvisit.patientID}`);
});

// Today Inbound List 
const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);

router.get("/today", async (req, res)=>{                      // /inbound/today
  // Fetch all visits where visitDate is today
  const visits = await Visit.find({visitDate: { $gte: startOfToday, $lte: endOfToday }})
  .sort({ visitDate: 1 }) // earliest first
  .populate("patientID"); // populate patient details
  res.render("visit/show.ejs", { visits });
});


//Update Status for inbound list
router.get("/:id/status",async(req,res)=>{
  let {id} = req.params;
  let visit = await Visit.findById(id).populate("patientID");
  res.render("visit/edit.ejs",{visit});
});


router.put("/:id/status", async(req, res)=>{
  let {id} = req.params;
  let {status} = req.body.visit;
  let clientVersion = req.body.version;
  let update = {status};
  if(status === "with_provider"){
    update.startedAt = new Date();
  }
  if(status === "completed") {
    update.completedAt = new Date();
  }
  // let newvisit = await Visit.findByIdAndUpdate(id, update, { new: true });
  //  new update
  let newvisit = await Visit.findOneAndUpdate(
    { _id: id, __v: clientVersion },   
    { ...update, $inc: { __v: 1 } },   
    { new: true }
  );
  if(!newvisit){
    req.flash("error","This visit was already updated by another user. Please refresh and try again.");
    return res.redirect("/visits/today");
  }
  console.log("update status is", newvisit);
  res.redirect("/visits/today");
});


module.exports = router;