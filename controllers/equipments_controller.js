import Equipment from "../models/equipment.js";
import express from "express";

const router = express.Router();

router.get("/equipments/new", async (req, res) => {
  res.render("equipments/new");
});

router.get("/equipments/:id/edit", async (req, res) => {
  const equipment = await Equipment.findByPk(req.params.id);

  res.render("equipments/edit", { equipment: equipment.get({ plain: true }) });
});

router.route("/equipments")
  .post(async (req, res) => {
    try {
      const equipment = Equipment.build(req.body);
      await equipment.save()

      res.redirect(`/equipments/${equipment.id}`);
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const equipment_records = await Equipment.findAll();
      const equipments = equipment_records.map((equipment) => equipment.get({ plain: true }));

      res.render("equipments/index", { equipments });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/equipments/:id")
  .get(async (req, res) => {
    try {
      const equipment = await Equipment.findByPk(req.params.id);

      res.render("equipments/show", { equipment: equipment.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const equipment = await Equipment.findByPk(req.params.id);
      await equipment.update(req.body)

      res.redirect(`/equipments/${equipment.id}`);
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/equipments/:id/delete", async (req, res) => {
    try {
      const equipment = await Equipment.findByPk(req.params.id);
      await equipment.destroy();

      res.redirect("/equipments");
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })

export default router;
