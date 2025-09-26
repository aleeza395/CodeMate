import express from "express"
import { GoogleGenAI } from "@google/genai"
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()

const ai = new GoogleGenAI({apiKey : process.env.GEN_AI_KEY})

router.post('/', async (req, res) => {
    try {
        const {query} = req.body
    const response = await ai.models.generateContent({
        model : "gemini-2.0-flash-lite",
        contents : query
    })
    const answer = response.text
    res.status(200).json(answer)
    } catch(err) {
        console.log("Error : ", err)
    }
} )

export default router