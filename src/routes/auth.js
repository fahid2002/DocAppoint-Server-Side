const { Router } = require("express");
const { issueJWT } = require("../controllers/authController");
const { verifyJWT } = require("../middleware/auth");

const router = Router();

// POST /api/auth/jwt — issue a JWT for a verified user
router.post("/jwt",  issueJWT);

module.exports = router;