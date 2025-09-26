import express from "express"
import user from '../models/user.js'
const router = express.Router()
import bcrypt from 'bcrypt'

router.post("/", async (req, res) => {
    try {
        const {username, email, password} = user(req.body)
        console.log(username, email, password)

        
        const alreadyUser = await user.findOne({email})
        if(alreadyUser) {
            console.log("already a user")
            return res.status(200).json({message : "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new user({username, email, password : hashedPassword})
        await newUser.save()

        res.status(200).json({message : "Successfully registered"})
    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

export default router