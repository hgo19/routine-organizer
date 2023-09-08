import DayToDo from '../../components/DayToDo'
import Habits from '../../components/Habits'
import WeekDays from '../../components/WeekDays'
import './styles.css'

export default function Home() {
  return (
    <main className="main-container">
      <section>
        <WeekDays />
        <DayToDo />
      </section>
      <Habits />
    </main>
  )
}
