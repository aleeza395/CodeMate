import express from "express"
import { GoogleGenAI } from "@google/genai"
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()

const ai = new GoogleGenAI({apiKey : process.env.GEN_AI_KEY})

router.post('/', async (req, res) => {
    try {
        const {messages} = req.body
        console.log(messages)

    const response = await ai.models.generateContent({
        model : "gemini-2.0-flash-lite",
        contents : messages.map(m => ({
            role : m.role == "user" ? "user" : "model",
            parts : [{text : m.text}]
        }))
    })

    const result = response.text
    res.status(200).json(result)
    } catch(err) {
        console.log("Error : ", err)
    }
} )

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await QuizResult.find({ userId }).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

export default router