import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import signupStyling from './Signup.module.css'

const Signup = () => {
    const [username, setUsername] = useState("") 
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirmPassword = (e) => {
        setConfirmpassword(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmpassword) {
            setError("Password and Confirm password do not match")
        } else {
            setError("")
            try {
            const res = await axios.post("https://code-mate-five.vercel.app/signup", {
            username : username,
            email : email,
            password : password, 
            confirmpassword : confirmpassword
        })
        console.log("Response : ", res.data)
        alert("User registered successfully")
        window.location.href = "/dashboard";
        } catch (err) {
            console.log("Error : ", err)
        }
        }
    }
  return (
    <div id={signupStyling.signup_page}>
        <div className={signupStyling.form_container}>
           <div className={signupStyling.form_content}>
             <h1>Signup</h1>
        <p>Make your account and get started</p>
        <p>Already a user? <Link to='/login'>Go to Login</Link></p>
        <form onSubmit={handleSubmit}>
            {error && <small>{error}</small>}
            <label for='username'>Username<br></br>
                <input type='text' name='username' value={username} onChange={handleUsername} placeholder='Enter username here' required />
            </label>
            <label for='email'>Email<br></br>
                <input type='email' name='email' value={email} onChange={handleEmail} placeholder='Enter email here' required />
            </label>
            <label for='password'>Password<br></br>
                <input type='password' name='password' value={password} onChange={handlePassword} placeholder='Enter password here' minLength={8} pattern='^[a-zA-Z0-9_]+$' required />
            </label>
            <label for='confirmpassword'>Confirm password<br></br>
                <input type='password' name='confirmpassword' value={confirmpassword} onChange={handleConfirmPassword} placeholder='Enter password here again' minLength={8} required />
            </label>
            <button type='submit'>Signup</button>
        </form>
           </div>
            <img src='signup-img.png' alt='login' className='image'></img>
        </div>
    </div>
  )
}

export default Signup
