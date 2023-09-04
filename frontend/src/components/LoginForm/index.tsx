import { FormEvent, useState } from 'react'
import { login } from '../../services/auth-service'
import axios from 'axios'
import Input from '../Input'
import './styles.css'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await login(email, password)
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
    <form onSubmit={(e) => handleSubmit(e)} className="form-container">
      <h2>Welcome back!</h2>
      <h4>Enter your Credentials to access your account</h4>
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
      {errorMsg ?? <p>{errorMsg}</p>}
      <button type="submit" onClick={() => navigate('/home')}>
        Login
      </button>
      <span>
        Don't have account? <Link to="/register">Sign Up</Link>
      </span>
    </form>
  )
}
