# Patient Inbound Tracker

## Internship Assignment Submission

This project is developed as part of an internship assignment to demonstrate understanding of backend workflows, database design, and basic frontend integration for a patient check-in system.

---

## Objective

To build a simple patient inbound tracking system that allows:
- Searching patients by phone number
- Managing patient visits
- Tracking visit status flow
- Recording timestamps for visit lifecycle

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend
- EJS
- HTML, CSS
- Bootstrap

---

## Core Features Implemented

- Patient search using phone number
- Phone number normalization for consistent search
- Walk-in patient check-in
- Visit creation and tracking
- Visit status lifecycle:
  1. checked-in
  2. with_provider
  3. completed
- Automatic timestamp handling:
  - startedAt
  - completedAt
- Today’s visit list view

---

## Example Workflow

1. Receptionist searches patient using phone number
2. Patient details are displayed
3. Receptionist checks in patient as walk-in
4. Visit appears in Today’s List with status `checked-in`
5. Status updates to `with_provider` when visit starts
6. Status updates to `completed` when visit ends

All important timestamps are recorded automatically.

---

## Database Design (MongoDB)

### Patient Collection
- firstName – Patient’s first name
- lastName – Patient’s last name
- dateOfBirth – Patient’s date of birth
- phone – Stored as a nested object for normalization  
  - raw – Original phone number entered  
  - normalized – Normalized phone number used for search
- email – Patient’s email address
- medicalAlerts – Important medical notes or alerts
- createdAt – Record creation timestamp

### Visit Collection
- patientId (ObjectId reference)
- visitDate
- visitType (walk-in / appointment)
- status
- startedAt
- completedAt

Indexes are applied on phone number and visit-related fields to improve query performance.

---

## Phone Number Normalization

Phone numbers are normalized before saving and searching:
- Country code and special characters are removed
- Ensures consistent matching
- Improves search reliability and performance

---

## Setup Instructions

### 1. Install dependencies
npm install

MONGO_URI=mongodb://127.0.0.1:27017/patienttracker
PORT=8080

Scope Limitations / Pending Work

The current project has the following pending enhancements:

Advanced analytics dashboards

UI/UX improvements

Deployment configuration

High-level concurrency optimization

Notes:
MongoDB is used instead of SQL for simplicity

node_modules folder is intentionally excluded from version control

Focus is on correctness of flow and backend logic rather than production-ready features



