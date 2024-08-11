import appointments_controller from "./controllers/appointments_controller.js";
import equipments_controller from "./controllers/equipments_controller.js";
import patients_controller from "./controllers/patients_controller.js";
import users_controller from "./controllers/users_controller.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("home");
});
router.use(appointments_controller);
router.use(equipments_controller);
router.use(patients_controller);

export default router;
