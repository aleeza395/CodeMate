import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../components/AuthContext'
import signupStyling from './Signup.module.css'

const Login = () => {
    const {login} = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:5000/login", {
                username : username,
            email : email,
            password : password
        })
        console.log("res : ", res, "token : ", res.data.token)
        console.log(res.data.user)
        login(res.data.user)
            localStorage.setItem("token", res.data.token)
            console.log("assinged")
            navigate('/dashboard')
        } catch (err) {
            console.log("error : ", err)
        }

    }
  return (
    <div id={signupStyling.signup_page}>
        <div className={signupStyling.form_container}>
            <div className={signupStyling.form_content}>
            <h1>Login</h1>
        <p>Login your account and get started</p>
        <p>New user? <Link to='/signup'>Go to Signup</Link></p>
        <form onSubmit={handleSubmit}>
            <label for='username'>Email<br></br>
                <input type='username' name='username' placeholder='Enter username here' value={username} onChange={handleUsername} />
            </label>
            <label for='email'>Email<br></br>
                <input type='email' name='email' placeholder='Enter email here' value={email} onChange={handleEmail} />
            </label>
            <label for='password'>Password<br></br>
                <input type='password' name='password' placeholder='Enter password here' value={password} onChange={handlePassword} />
            </label>
            <button type='submit'>Login</button>
        </form>
        </div>
        <img src='signup-img.png' alt='login' className='image'></img>
        </div>
    </div>
  )
}

export default Login