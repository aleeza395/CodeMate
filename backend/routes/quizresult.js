import express from "express";
import QuizResult from "../models/quizresult.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  try {
    const { userId, language, score } = req.body;
    console.log(userId, language, score)

    const newResult = new QuizResult({ userId, language, score });
    await newResult.save();

    res.status(201).json({ message: "Result saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving result" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.params.userId });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Error fetching results" });
  }
});

export default router;
