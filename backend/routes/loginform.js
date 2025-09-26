import express from "express"
const router = express.Router()
import user from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

router.post("/", async (req, res) => {
    try {
        const {username, email, password} = req.body

    const loggedinUser = await user.findOne({email})
    if(!loggedinUser) {
        res.status(200).json({message : "User doesn't exists"})
    }

    const isUser = await bcrypt.compare(password, loggedinUser.password)
    if(!isUser) {
        res.status(200).json({message : "Invalid credentials"})
    }

    const token = jwt.sign({id : loggedinUser.id}, process.env.SECRET_KEY, {expiresIn : "1h"})

    res.json({token, user : {
        _id : loggedinUser._id,
        username : loggedinUser.username,
        email : loggedinUser.email
    }})
    } catch(err) {
        res.status(500).json({message : err.message})
    }
})

export default router