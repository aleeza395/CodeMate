import express from 'express'
const app = express()
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import signuproute from './routes/signupform.js'
import loginroute from './routes/loginform.js'
import queryroute from './routes/queryroute.js'
import updatesroute from './routes/updatesroute.js'
import runcode from './routes/runcode.js'
import checkcode from './routes/checkcode.js'
import quizroute from './routes/quizroute.js'
import quizResultsRoutes from "./routes/quizresult.js";
import missionroute from "./routes/missionroute.js"
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Database connected"))
.catch(err => console.log("Error connecting to database"))

app.get('/', (req, res) => {
    res.send("Backend is running ")
})

app.use('/signup', signuproute)
app.use('/login', loginroute)
app.use('/api/query', queryroute)
app.use('/updates', updatesroute)
app.use('/runcode', runcode)
app.use('/checkcode', checkcode)
app.use('/quizroute', quizroute)
app.use("/api/quizresults", quizResultsRoutes);
app.use("/api/missions", missionroute)


app.listen(PORT)