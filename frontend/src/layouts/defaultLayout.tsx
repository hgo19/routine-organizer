import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import './styles.css'

const DefaultLayout = () => {
  return (
    <div className="layout-content">
      <SideBar />
      <div className="outlet-container">
        <Outlet />
      </div>
    </div>
  )
}

export default DefaultLayout
