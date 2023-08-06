import { type AccountInput } from '../usecases/add-account-protocols'

export class UserAccount {
  private name: string
  private email: string
  private password: string
  private passwordConfirmation: string
  private readonly emailRgx: RegExp

  constructor () {
    this.name = ''
    this.email = ''
    this.password = ''
    this.passwordConfirmation = ''
    this.emailRgx = /\S+@\S+\.\S+/
  }

  create (userInfo: AccountInput): boolean {
    this.validations(userInfo)
    this.name = userInfo.name
    this.email = userInfo.email
    this.password = userInfo.password
    this.passwordConfirmation = userInfo.passwordConfirmation
    return true
  }

  validations (userInfo: AccountInput): void {
    const { name, email, password, passwordConfirmation } = userInfo
    this.lengthValidations(userInfo)

    if (password !== passwordConfirmation) {
      throw new Error('Invalid Parameters: Passwords must be the same!')
    }
    if (!this.emailRgx.test(email)) {
      throw new Error('Invalid Parameters: Email is incorrect')
    }
    const properties = [name, email, password, passwordConfirmation]
    if (!properties.some((property) => property === '')) {
      throw new Error("Invalid Parameters: Property can't be empty")
    }
  }

  lengthValidations (userInfo: AccountInput): void {
    const { name, password } = userInfo
    if (name.length < 3) {
      throw new Error('Invalid Parameters: Name must be more than 3 characters')
    }

    if (password.length < 6) {
      throw new Error('Invalid Parameters: Password must be more than 6 characters')
    }
  }
}
