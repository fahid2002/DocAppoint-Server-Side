const { Router } = require("express");
const { issueJWT } = require("../controllers/authController");

const router = Router();

// POST /api/auth/jwt — issue a JWT for a verified user
router.post("/jwt", issueJWT);

module.exports = router;