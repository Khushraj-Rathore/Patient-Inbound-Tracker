const express = require("express");
const app = express();
const router = express.Router({mergeParams : true});
const Patient = require("../models/patient.js");
const Visit = require("../models/visit.js");


router.get("/",(req,res)=>{
    res.render("search/index.ejs", { patientsData: [],showCreatePatient: false});
});


router.get("/patients/search", async(req,res)=>{
    const { phone } = req.query;

    let patientsData = [];
    const safePhone = phone.replace(/\D/g, ""); //remove all non digit value
  
    const patients = await Patient.find({
      "phones.normalized": { $regex: safePhone}
    });
  
    for (let patient of patients) {
      const visits = await Visit.find({ patientID: patient._id })
        .sort({ visitDate: -1 })
        .limit(5);
  
      patientsData.push({ patient, visits });
    }
  
    res.render("search/show.ejs", {
      patientsData,
      phone
    });
});

// Create Patients
router.get("/patients",(req,res)=>{
  res.render("search/new.ejs");
}); 

router.post("/patients",async(req,res)=>{
  let patient = req.body.patient;
  if (patient.phones && patient.phones.length > 0) {
    patient.phones = patient.phones.map(phone => ({
      original: phone.original,
      normalized: phone.original.replace(/\D/g, "")
    }));
  }
  let newpatient = new Patient(patient);
  await newpatient.save();
  console.log(newpatient);
  req.flash("success","Patient added");
  res.redirect("/");
});

// Show page after CheckIN
router.get("/patients/:id", async (req, res) => {
  const { id } = req.params;

  const patient = await Patient.findById(id);

  const visits = await Visit.find({ patientID: id })
    .sort({ visitDate: -1 })
    .limit(5);

  res.render("search/show.ejs", {patientsData: [{patient,visits}],phone: null});
});

module.exports = router;