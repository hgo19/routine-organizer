import { type AccountInput } from '../usecases/add-account-protocols'

export class UserAccount {
  private name: string
  private email: string
  private password: string
  private passwordConfirmation: string
  private readonly emailRgx: any

  constructor () {
    this.name = ''
    this.email = ''
    this.password = ''
    this.passwordConfirmation = ''
    this.emailRgx = /\S+@\S+\.\S+/
  }

  create (userInfo: AccountInput): boolean {
    this.name = userInfo.name
    this.email = userInfo.email
    this.password = userInfo.password
    this.passwordConfirmation = userInfo.passwordConfirmation
    return this.validations()
  }

  validations (): boolean {
    if (this.password !== this.passwordConfirmation) {
      throw new Error('Invalid Parameters: Passwords must be the same!')
    }

    return true

    // if(!this.email.match(this.emailRgx)) {
    //   throw new Error()
    // }
  }
}
