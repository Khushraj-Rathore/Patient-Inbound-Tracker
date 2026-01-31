const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const patientsRouter = require("./routes/patients.js");
const visitsRouter = require("./routes/visits.js");
const analyticsRouter = require("./routes/analytics.js");


async function main() { 
  await mongoose.connect('mongodb://127.0.0.1:27017/patienttracker');
};


main().then(()=>{
    console.log("connect");
    }).catch((err)=>{ 
    console.log(err); 
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(session({
  secret: "thisisasecretkey",
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/",patientsRouter);
app.use("/visits",visitsRouter);
app.use("/analytics",analyticsRouter);

app.listen(8080,()=>{
  console.log(`Listening on port 8080`);
});