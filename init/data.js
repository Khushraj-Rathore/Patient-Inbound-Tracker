const sampledata = [
  {
    firstname: "Amit",
    lastname: "Sharma",
    dob: new Date("1998-05-12"),
    phones: [
      {
        original: "+91 98765 43210",
        normalized: "919876543210"
      }
    ],
    email: "amit.sharma@gmail.com",
    medicalAlerts: "Diabetes"
  },
  {
    firstname: "Priya",
    lastname: "Verma",
    dob: new Date("2001-09-23"),
    phones: [
      {
        original: "+91-91234-56789",
        normalized: "919123456789"
      },
      {
        original: "011-23456789",
        normalized: "911123456789"
      }
    ],
    email: "priya.verma@gmail.com",
    medicalAlerts: "Allergic to penicillin"
  },
  {
    firstname: "Rahul",
    lastname: "Singh",
    dob: new Date("1995-02-17"),
    phones: [
      {
        original: "+91 99887 76655",
        normalized: "919988776655"
      }
    ],
    email: "rahul.singh@gmail.com",
    medicalAlerts: "Asthma"
  },
];

module.exports = { data: sampledata };
