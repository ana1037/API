import Appointment from "../models/appointment.js";
import express from "express";

const router = express.Router();

router.get("/appointments/new", async (req, res) => {
  res.render("appointments/new");
});

router.get("/appointments/:id/edit", async (req, res) => {
  const appointment = await Appointment.findByPk(req.params.id);

  res.render("appointments/edit", { appointment: appointment.get({ plain: true }) })
});

router.route("/appointments")
  .post(async (req, res) => {
    try {
      const appointment = Appointment.build(req.body);
      await appointment.save()

      res.redirect(`/appointments/${appointment.id}`);
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const appointment_records = await Appointment.findAll();
      const appointments = appointment_records.map((appointment) => appointment.get({ plain: true }));

      res.render("appointments/index", { appointments });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/appointments/:id")
  .get(async (req, res) => {
    try {
      const appointment = await Appointment.findByPk(req.params.id);

      res.render("appointments/show", { appointment: appointment.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const appointment = await Appointment.findByPk(req.params.id);
      await appointment.update(req.body)

      res.redirect(`/appointments/${appointment.id}`);
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/appointments/:id/delete", async (req, res) => {
    try {
      const appointment = await Appointment.findByPk(req.params.id);
      await appointment.destroy();

      res.redirect("/appointments");
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })

export default router;
