import { type AccountInput } from '../usecases/add-account-protocols'

export class UserAccount {
  private name: string
  private email: string
  private password: string
  private passwordConfirmation: string

  constructor () {
    this.name = ''
    this.email = ''
    this.password = ''
    this.passwordConfirmation = ''
  }

  createUser (userInfo: AccountInput): void {
    this.name = userInfo.name
    this.email = userInfo.email
    this.password = userInfo.password
    this.passwordConfirmation = userInfo.passwordConfirmation
  }

  validatePassword (): boolean {
    if (this.password !== this.passwordConfirmation) {
      throw new Error()
    } else {
      return true
    }
  }
}
