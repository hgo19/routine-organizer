import { Link } from 'react-router-dom'
import './styles.css'

export default function Header() {
  return (
    <header className="header-container">
      <nav className="nav-container">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Schedule</Link>
        </li>
        <li>
          <Link to="/">Pomodoro</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </nav>
    </header>
  )
}
