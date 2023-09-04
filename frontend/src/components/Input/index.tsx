import './styles.css'

type InputTypes = {
  name: string
  type: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  label: string
}

export default function Input({ name, type, onChange, label }: InputTypes) {
  return (
    <div className="input-group">
      <label htmlFor={name}>
        <p>{label}</p>
        <input type={type} id={name} name={name} onChange={onChange} />
      </label>
    </div>
  )
}
