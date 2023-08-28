import { type AuthenticationRepository } from '../protocols/authentication-repository'

export interface inputAuthentication {
  email: string
  password: string
}

export class Authentication {
  private readonly repository
  constructor (repository: AuthenticationRepository) {
    this.repository = repository
  }

  async auth (input: inputAuthentication): Promise<any> {
    const { email, password } = input
    const userInDb = await this.repository.findByEmail(email)
  }
}
