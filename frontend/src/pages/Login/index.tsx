import LoginForm from '../../components/LoginForm'
import './styles.css'

export default function Login() {
  return (
    <main className="login-page">
      <section className="login-container">
        <LoginForm />
      </section>
      <section className="login-img" />
    </main>
  )
}
