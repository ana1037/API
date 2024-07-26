import appointments_controller from "./controllers/appointments_controller.js";
import equipments_controller from "./controllers/equipments_controller.js";
import express from "express";

const router = express.Router();
router.use(appointments_controller);
router.use(equipments_controller);

export default router;
