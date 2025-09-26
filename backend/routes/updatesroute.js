import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=technology&apiKey=${process.env.NEWS_API_KEY}`)
        res.json(response.data)
    } catch (err) {
        res.status(500).json({error : err.message})
        console.log("Error : ", err)
    }
})

export default router