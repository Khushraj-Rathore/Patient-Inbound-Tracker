const express = require("express");
const app = express();
const router = express.Router();
const Visit = require("../models/visit.js");


router.get("/daily-intake",async(req, res)=>{
    //  Start & End of Today 
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    //  Fetch today's visits 
    const todaysVisits = await Visit.find({visitDate: { $gte: startOfDay, $lte: endOfDay }});

    const totalArrivals = todaysVisits.length;

    //  Walk-ins vs Appointments 
    let walkIns = 0;
    let appointments = 0;

    todaysVisits.forEach(visit => {
      if (visit.visitType === "walk-in") {
        walkIns++;
      }
      if (visit.visitType === "appointment") {
        appointments++;
      }
    });

    //  Repeat patient rate
    const patientIds = todaysVisits.map(v => v.patientId);

    const repeatPatients = await Visit.distinct("patientId",{patientId: {$in: patientIds},visitDate: {$lt: startOfDay}});

    let repeatRate = 0;
    if (totalArrivals > 0){
      repeatRate = Math.round((repeatPatients.length / totalArrivals) * 100);
    };
    res.render("dailyintake/show.ejs", {totalArrivals,walkIns,appointments,repeatRate});
});

router.get("/flow-efficiency",async(req, res)=>{
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const visits = await Visit.find({
      createdAt: { $gte: sevenDaysAgo },
      status: "completed",
      checkedInAt: { $ne: null },
      completedAt: { $ne: null }
    });

    const totalCompleted = visits.length;
    let within30Min = 0;

    for (let visit of visits) {
      const diffMinutes =(visit.completedAt - visit.checkedInAt) / (1000 * 60);
      if (diffMinutes <= 30) {
        within30Min++;
      }
    }

    let efficiency = 0;

    if (totalCompleted > 0) {
      efficiency = Math.round((within30Min / totalCompleted) * 100);
    }

    res.render("flowefficiency/show.ejs", {efficiency,totalCompleted,within30Min});
});

module.exports = router;