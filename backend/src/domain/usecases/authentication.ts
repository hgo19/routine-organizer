import { type Encrypter } from '../protocols'
import { type AuthenticationRepository } from '../protocols/authentication-repository'

export interface inputAuthentication {
  email: string
  password: string
}

export class Authentication {
  private readonly repository
  private readonly encrypter

  constructor (repository: AuthenticationRepository, encrypter: Encrypter) {
    this.repository = repository
    this.encrypter = encrypter
  }

  async auth (input: inputAuthentication): Promise<any> {
    const { email, password } = input
    const userInDb = await this.repository.findByEmail(email)
    const hashPassword = await this.encrypter.encrypt(password)
  }
}
