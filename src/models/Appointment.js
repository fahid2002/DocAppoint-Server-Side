const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true, index: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    specialty: { type: String, required: true },
    hospital: { type: String, default: "" },
    doctorImg: { type: String, default: "" },
    patientName: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: "Male" },
    phone: { type: String, required: true },
    appointmentDate: { type: String, required: true },
    appointmentTime: { type: String, required: true },
    status: { type: String, enum: ["Upcoming", "Completed", "Cancelled"], default: "Upcoming" },
    fee: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = { Appointment };