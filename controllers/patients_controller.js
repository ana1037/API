import Patient from "../models/patient.js";
import express from "express";

const router = express.Router();

router.get("/patients/new", async (req, res) => {
  res.render("patients/new");
});

router.get("/patients/:id/edit", async (req, res) => {
  const patient = await Patient.findByPk(req.params.id);

  res.render("patients/edit", { patient });
});

router.route("/patients")
  .post(async (req, res) => {
    try {
      const patient = Patient.build(req.body);
      await patient.save()

      res.redirect(`/patients/${patient.id}`);
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const patient_records = await Patient.findAll();
      const patients = patient_records.map((patient) => patient.get({ plain: true }));

      res.render("patients/index", { patients });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/patients/:id")
  .get(async (req, res) => {
    try {
      const patient = await Patient.findByPk(req.params.id);

      res.render("patients/show", { patient: patient.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const patient = await Patient.findByPk(req.params.id);
      await patient.update(req.body)

      res.redirect(`/patients/${patient.id}`);
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/patients/:id/delete", async (req, res) => {
    try {
      const patient = await Patient.findByPk(req.params.id);
      await patient.destroy();

      res.redirect("/patients");
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })

export default router;

