import Appointment from "../models/appointment.js";
import express from "express";

const router = express.Router();

router.route("/appointments")
  .post(async (req, res) => {
    try {
      const appointment = Appointment.build(req.body);
      await appointment.save()

      res.status(201).json({ appointment: appointment.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const appointment_records = await Appointment.findAll();
      const appointments = appointment_records.map((appointment) => appointment.get({ plain: true }));

      res.json({ appointments });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/appointments/:id")
  .get(async (req, res) => {
    try {
      const appointment = await Appointment.findByPk(req.params.id);

      res.json({ appointment: appointment.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const appointment = await Appointment.findByPk(req.params.id);
      await appointment.update(req.body)

      res.json({ appointment: appointment.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const appointment = await Appointment.findByPk(req.params.id);
      await appointment.destroy();

      res.sendStatus(204);
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })

export default router;
