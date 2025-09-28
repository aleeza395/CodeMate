import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

import signuproute from './routes/signupform.js'
import loginroute from './routes/loginform.js'
import queryroute from './routes/queryroute.js'
import updatesroute from './routes/updatesroute.js'
import runcode from './routes/runcode.js'
import checkcode from './routes/checkcode.js'
import quizroute from './routes/quizroute.js'
import quizResultsRoutes from "./routes/quizresult.js"
import missionroute from "./routes/missionroute.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch(err => console.log("Error connecting to database:", err))

app.use('/signup', signuproute)
app.use('/login', loginroute)
app.use('/api/query', queryroute)
app.use('/updates', updatesroute)
app.use('/runcode', runcode)
app.use('/checkcode', checkcode)
app.use('/quizroute', quizroute)
app.use("/api/quizresults", quizResultsRoutes)
app.use("/api/missions", missionroute)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "frontend/build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
