import { Outlet } from 'react-router-dom'
import Header from '../components/header'

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default DefaultLayout
