const { Appointment } = require("../models/Appointment");

async function getAppointments(req, res) {
  try {
    const email = req.query.email;
    if (!email || email !== req.user?.email) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const appointments = await Appointment.find({ userEmail: email }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function createAppointment(req, res) {
  try {
    const { userEmail, ...rest } = req.body;
    if (userEmail !== req.user?.email) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    const appt = await Appointment.create({ userEmail, ...rest });
    res.status(201).json(appt);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function updateAppointment(req, res) {
  try {
    const { id } = req.params;
    const appt = await Appointment.findById(id);
    if (!appt) { res.status(404).json({ error: "Not found" }); return; }
    if (appt.userEmail !== req.user?.email) { res.status(403).json({ error: "Forbidden" }); return; }

    const { patientName, gender, phone, appointmentDate, appointmentTime } = req.body;
    const updated = await Appointment.findByIdAndUpdate(
      id,
      { patientName, gender, phone, appointmentDate, appointmentTime },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function deleteAppointment(req, res) {
  try {
    const { id } = req.params;
    const appt = await Appointment.findById(id);
    if (!appt) { res.status(404).json({ error: "Not found" }); return; }
    if (appt.userEmail !== req.user?.email) { res.status(403).json({ error: "Forbidden" }); return; }

    await Appointment.findByIdAndDelete(id);
    res.json({ success: true, message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { getAppointments, createAppointment, updateAppointment, deleteAppointment };