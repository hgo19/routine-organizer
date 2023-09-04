import axios from 'axios'

const API_URL = `http://localhost:3001/user/`

export async function login(email: string, password: string) {
  const response = await axios.post(API_URL + 'login', {
    email,
    password
  })
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

export async function register(
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string
) {
  const response = await axios.post(API_URL + 'register', {
    name,
    email,
    password,
    passwordConfirmation
  })
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}
