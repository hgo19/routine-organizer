import './styles.css'

export default function DayToDo() {
  return (
    <div className="toDo-container">
      <div className="toDo-line">
        <label>
          <input type="checkbox" /> ToDo Item
        </label>
      </div>
      <div className="toDo-line">
        <label>
          <input type="checkbox" /> ToDo Item
        </label>
      </div>
    </div>
  )
}
