const { Router } = require("express");
const { verifyJWT } = require("../middleware/auth");
const { getAppointments, createAppointment, updateAppointment, deleteAppointment } = require("../controllers/appointmentController");

const router = Router();

router.use(verifyJWT);

router.get("/", getAppointments);
router.post("/", createAppointment);
router.patch("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

module.exports = router;