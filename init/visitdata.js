const Visit = require("../models/visit.js");
const mongoose = require("mongoose");
const Patient = require("../models/patient.js");

const visitData = [
  // Amit Sharma
  {
    patientID: "697667685848ee0d2f473cad",
    visitDate: new Date("2024-08-10"),
    visitType: "appointment",
    status: "completed",
    reason: "Initial diabetes diagnosis",
    checkInAt: new Date("2024-08-10T09:00:00"),
    startedAt: new Date("2024-08-10T09:30:00"),
    completedAt: new Date("2024-08-10T10:15:00")
  },
  {
    patientID: "697667685848ee0d2f473cad",
    visitDate: new Date("2024-09-15"),
    visitType: "appointment",
    status: "completed",
    reason: "Blood sugar monitoring",
    checkInAt: new Date("2024-09-15T08:45:00"),
    startedAt: new Date("2024-09-15T09:10:00"),
    completedAt: new Date("2024-09-15T09:50:00")
  },
  {
    patientID: "697667685848ee0d2f473cad",
    visitDate: new Date("2024-10-20"),
    visitType: "walk-in",
    status: "completed",
    reason: "Medication adjustment",
    checkInAt: new Date("2024-10-20T11:00:00"),
    startedAt: new Date("2024-10-20T11:20:00"),
    completedAt: new Date("2024-10-20T12:00:00")
  },
  {
    patientID: "697667685848ee0d2f473cad",
    visitDate: new Date("2024-11-25"),
    visitType: "appointment",
    status: "completed",
    reason: "HbA1c test review",
    checkInAt: new Date("2024-11-25T10:00:00"),
    startedAt: new Date("2024-11-25T10:30:00"),
    completedAt: new Date("2024-11-25T11:00:00")
  },
  {
    patientID: "697667685848ee0d2f473cad",
    visitDate: new Date("2025-01-05"),
    visitType: "appointment",
    status: "no-show",
    reason: "Quarterly diabetes checkup",
    checkInAt: new Date("2025-01-05T09:00:00")
  },

  // Priya Verma
  {
    patientID: "697667685848ee0d2f473caf",
    visitDate: new Date("2024-07-12"),
    visitType: "walk-in",
    status: "completed",
    reason: "Severe allergic reaction",
    checkInAt: new Date("2024-07-12T14:00:00"),
    startedAt: new Date("2024-07-12T14:20:00"),
    completedAt: new Date("2024-07-12T15:00:00")
  },
  {
    patientID: "697667685848ee0d2f473caf",
    visitDate: new Date("2024-08-18"),
    visitType: "appointment",
    status: "completed",
    reason: "Allergy medication review",
    checkInAt: new Date("2024-08-18T09:30:00"),
    startedAt: new Date("2024-08-18T09:50:00"),
    completedAt: new Date("2024-08-18T10:20:00")
  },
  {
    patientID: "697667685848ee0d2f473caf",
    visitDate: new Date("2024-09-22"),
    visitType: "walk-in",
    status: "completed",
    reason: "Skin allergy flare-up",
    checkInAt: new Date("2024-09-22T16:00:00"),
    startedAt: new Date("2024-09-22T16:15:00"),
    completedAt: new Date("2024-09-22T16:45:00")
  },
  {
    patientID: "697667685848ee0d2f473caf",
    visitDate: new Date("2024-11-02"),
    visitType: "appointment",
    status: "completed",
    reason: "Allergy test results",
    checkInAt: new Date("2024-11-02T11:00:00"),
    startedAt: new Date("2024-11-02T11:20:00"),
    completedAt: new Date("2024-11-02T11:50:00")
  },
  {
    patientID: "697667685848ee0d2f473caf",
    visitDate: new Date("2025-01-10"),
    visitType: "appointment",
    status: "no-show",
    reason: "Seasonal allergy check",
    checkInAt: new Date("2025-01-10T09:00:00")
  },

  // Rahul Singh
  {
    patientID: "697667685848ee0d2f473cb2",
    visitDate: new Date("2024-06-05"),
    visitType: "walk-in",
    status: "completed",
    reason: "Asthma attack",
    checkInAt: new Date("2024-06-05T20:00:00"),
    startedAt: new Date("2024-06-05T20:15:00"),
    completedAt: new Date("2024-06-05T21:00:00")
  },
  {
    patientID: "697667685848ee0d2f473cb2",
    visitDate: new Date("2024-07-10"),
    visitType: "appointment",
    status: "completed",
    reason: "Post-attack breathing assessment",
    checkInAt: new Date("2024-07-10T10:00:00"),
    startedAt: new Date("2024-07-10T10:20:00"),
    completedAt: new Date("2024-07-10T10:50:00")
  },
  {
    patientID: "697667685848ee0d2f473cb2",
    visitDate: new Date("2024-09-01"),
    visitType: "walk-in",
    status: "completed",
    reason: "Inhaler technique review",
    checkInAt: new Date("2024-09-01T13:00:00"),
    startedAt: new Date("2024-09-01T13:20:00"),
    completedAt: new Date("2024-09-01T13:45:00")
  },
  {
    patientID: "697667685848ee0d2f473cb2",
    visitDate: new Date("2024-11-18"),
    visitType: "appointment",
    status: "completed",
    reason: "Lung function test",
    checkInAt: new Date("2024-11-18T09:00:00"),
    startedAt: new Date("2024-11-18T09:30:00"),
    completedAt: new Date("2024-11-18T10:00:00")
  },
  {
    patientID: "697667685848ee0d2f473cb2",
    visitDate: new Date("2025-01-22"),
    visitType: "appointment",
    status: "no-show",
    reason: "Seasonal asthma checkup",
    checkInAt: new Date("2025-01-22T09:00:00")
  }
];

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/patienttracker");
  console.log("MongoDB connected");

  await Visit.deleteMany({});
  await Visit.insertMany(visitData);
  console.log("Visits seeded successfully");

  mongoose.connection.close();
}

main().catch(console.error);
