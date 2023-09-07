import './styles.css'

export default function WeekDays() {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  return (
    <section className="weekDay-container">
      {weekDays.map((e, i) => (
        <div className="weekDay-card" key={i}>
          {e}
        </div>
      ))}
    </section>
  )
}
