import { AuthenticationError } from '../exceptions/authentication-error'
import { type TokenAuthenticator, type Encrypter, type AccountOutput } from '../protocols'
import { type AuthenticationRepository } from '../protocols/authentication-repository'

export interface inputAuthentication {
  email: string
  password: string
}

export class Authentication {
  private readonly repository
  private readonly encrypter
  private readonly tokenAuth

  constructor (repository: AuthenticationRepository, encrypter: Encrypter, tokenAuth: TokenAuthenticator) {
    this.repository = repository
    this.encrypter = encrypter
    this.tokenAuth = tokenAuth
  }

  async auth (input: inputAuthentication): Promise<AccountOutput> {
    const { email, password } = input
    const userInDb = await this.repository.findByEmail(email)
    const hashPassword = await this.encrypter.encrypt(password)

    if (userInDb.password !== hashPassword) {
      throw new AuthenticationError('Invalid password')
    }

    const accountData = {
      name: userInDb.name,
      email,
      password: hashPassword
    }

    const token = this.tokenAuth.generate(accountData)

    return {
      ...accountData, token
    }
  }
}
