import { FormEvent, useState } from "react"
import { login } from "../services/auth-service"
import axios from 'axios'


export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await login(email, password)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response)
        setErrorMsg(error.response?.data.error)
      }
    } 
  }


  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <fieldset>
        <input
          type="text"
          value={email}
          name="email"
          placeholder="seuemail@email.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          name="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
        >
          Login
        </button>
        {errorMsg ?? (<span>{errorMsg}</span>)}
      </fieldset>
    </form>
  )
}
