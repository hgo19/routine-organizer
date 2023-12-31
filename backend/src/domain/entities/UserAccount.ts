import { InvalidParamsError } from '../exceptions/invalid-params'
import { TypeError } from '../exceptions/type'
import { type AccountInput } from '../protocols'

export class UserAccount {
  private _name: string
  private _email: string
  private _password: string
  private _passwordConfirmation: string
  private readonly _emailRgx: RegExp

  constructor () {
    this._name = ''
    this._email = ''
    this._password = ''
    this._passwordConfirmation = ''
    this._emailRgx = /\S+@\S+\.\S+/
  }

  create (userInfo: AccountInput): boolean {
    this.validations(userInfo)
    this._name = userInfo.name
    this._email = userInfo.email
    this._password = userInfo.password
    this._passwordConfirmation = userInfo.passwordConfirmation
    return true
  }

  validations (userInfo: AccountInput): void {
    const { name, email, password, passwordConfirmation } = userInfo
    this.typeValidations(userInfo)
    this.lengthValidations(userInfo)

    if (password !== passwordConfirmation) {
      throw new InvalidParamsError('asswords must be the same!')
    }
    if (!this._emailRgx.test(email)) {
      throw new InvalidParamsError('Email is incorrect')
    }
    const properties = [name, email, password, passwordConfirmation]
    if (properties.some((property) => property.length === 0)) {
      throw new InvalidParamsError("Property can't be empty")
    }
  }

  lengthValidations (userInfo: AccountInput): void {
    const { name, password } = userInfo
    if (name.length < 3) {
      throw new InvalidParamsError('Name must be more than 3 characters')
    }

    if (password.length < 6) {
      throw new InvalidParamsError('Password must be more than 6 characters')
    }
  }

  typeValidations (userInfo: AccountInput): void {
    const { name, email, password, passwordConfirmation } = userInfo
    const properties = [name, email, password, passwordConfirmation]
    if (properties.some((property) => typeof property !== 'string')) {
      throw new TypeError('Property value need to be a string')
    }
  }

  get name (): string {
    return this._name
  }

  get email (): string {
    return this._email
  }

  get password (): string {
    return this._password
  }
}
