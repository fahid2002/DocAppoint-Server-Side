const { Review } = require("../models/Review");
const { Appointment } = require("../models/Appointment");

// GET /api/reviews/:doctorId — public, no auth needed
async function getReviews(req, res) {
  try {
    const reviews = await Review.find({ doctorId: req.params.doctorId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}

// POST /api/reviews — auth required, must have a booking with this doctor
async function createReview(req, res) {
  try {
    const { doctorId, rating, text, userName } = req.body;
    const userEmail = req.user?.email;

    if (!doctorId || !rating || !text) {
      res.status(400).json({ error: "doctorId, rating and text are required" });
      return;
    }

    // Verify user has actually booked this doctor
    const hasBooking = await Appointment.findOne({ userEmail, doctorId });
    if (!hasBooking) {
      res.status(403).json({ error: "You can only review doctors you have booked" });
      return;
    }

    // Upsert — update existing review if already submitted
    const review = await Review.findOneAndUpdate(
      { doctorId, userEmail },
      { doctorId, userEmail, userName: userName || userEmail, rating, text },
      { upsert: true, new: true, runValidators: true }
    );

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { getReviews, createReview };