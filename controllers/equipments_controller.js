import Equipment from "../models/equipment.js";
import express from "express";

const router = express.Router();

router.route("/equipments")
  .post(async (req, res) => {
    try {
      const equipment = Equipment.build(req.body);
      await equipment.save()

      res.status(201).json({ equipment: equipment.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const equipment_records = await Equipment.findAll();
      const equipments = equipment_records.map((equipment) => equipment.get({ plain: true }));

      res.json({ equipments });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/equipments/:id")
  .get(async (req, res) => {
    try {
      const equipment = await Equipment.findByPk(req.params.id);

      res.json({ equipment: equipment.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const equipment = await Equipment.findByPk(req.params.id);
      await equipment.update(req.body)

      res.json({ equipment: equipment.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const equipment = await Equipment.findByPk(req.params.id);
      await equipment.destroy();

      res.sendStatus(204);
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })

export default router;
