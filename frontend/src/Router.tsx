import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import DefaultLayout from './layouts/defaultLayout'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<DefaultLayout />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  )
}
