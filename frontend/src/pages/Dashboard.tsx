import DayToDo from '../components/DayToDo'
import WeekDays from '../components/WeekDays'
import Header from '../components/header'

export default function Dashboard() {
  return (
    <div>
      <Header />
      <WeekDays />
      <DayToDo />
    </div>
  )
}
