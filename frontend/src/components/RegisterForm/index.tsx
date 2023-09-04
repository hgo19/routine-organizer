import { FormEvent, useState } from 'react'
import { register } from '../../services/auth-service'
import axios from 'axios'
import Input from '../Input'
import { Link, useNavigate } from 'react-router-dom'

import './style.css'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await register(name, email, password, passwordConfirmation)
      setErrorMsg('')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response)
        setErrorMsg(error.response?.data.error)
      }
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="registerform-container">
      <h2>Get Started Now</h2>
      <Input
        name="name"
        type="text"
        onChange={(e) => setName(e.target.value)}
        label="Name"
      />
      <Input
        name="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        label="Email address"
      />
      <Input
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
      />
      <Input
        name="password"
        type="password"
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        label="Password Confirmation"
      />
      {errorMsg ?? <p>{errorMsg}</p>}
      <button type="submit" onClick={() => navigate('/home')}>
        Signup
      </button>
      <span>
        Have account? <Link to="/login">Sign In</Link>
      </span>
    </form>
  )
}
