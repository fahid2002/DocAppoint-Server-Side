const { Router } = require("express");
const { verifyJWT } = require("../middleware/auth");
const { getReviews, createReview } = require("../controllers/reviewController");

const router = Router();

// Public — anyone can read reviews
router.get("/:doctorId", getReviews);

// Protected — must be logged in to submit
router.post("/", verifyJWT, createReview);

module.exports = router;