import User from "../models/user.js";
import express from "express";

const router = express.Router();

router.route("/users")
  .post(async (req, res) => {
    try {
      const user = User.build(req.body);
      await user.save()

      res.status(201).json({ user: user.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const user_records = await User.findAll();
      const users = user_records.map((user) => user.get({ plain: true }));

      res.json({ patients });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  });

router.route("/users/:id")
  .get(async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      res.json({ user: user.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      await user.update(req.body)

      res.json({ user: user.get({ plain: true }) });
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      await user.destroy();

      res.sendStatus(204);
    } catch(error) {
      res.status(500).json({ error: error.message });
    }
  })

export default router;

