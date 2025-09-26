import express from "express";
import Mission from "../models/mission.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const mission = await Mission.findOne({ userId: req.params.userId });
    res.json(mission || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/save", async (req, res) => {
  try {
    const { userId, days, currentStreak } = req.body;
    let mission = await Mission.findOne({ userId });
    if (mission) {
      mission.days = days;
      mission.currentStreak = currentStreak;
      await mission.save();
    } else {
      mission = await Mission.create({ userId, days, currentStreak });
    }
    res.json(mission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
