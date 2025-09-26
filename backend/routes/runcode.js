import express from "express"
const router = express.Router()
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

router.post("/", async (req, res) => {
    try {
        const {code, language} = req.body
        console.log(code, language)
        const langMap = { python: 71, cpp: 54, javascript: 63 }
        const getOutput = await axios.post("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
            {
                source_code : code,
                language_id : langMap[language]
            },
            {
                headers : {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": process.env.RUN_API_KEY,  
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            }
            }
        )
        const result = getOutput.data
        res.json({output : result.stdout || result.stderr})
    } catch (err) {
        console.log("Error : ", err)
    }
})

export default router