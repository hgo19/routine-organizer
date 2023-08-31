import { type AccountModel } from '../../domain/protocols'
import { type AuthenticationRepository } from '../../domain/protocols/authentication-repository'
import { NotFoundError } from '../../presentation/helpers/http-erros'
import UserODM from '../database/mongoose/models/UserODM'

export class AuthenticationMongooseRepository implements AuthenticationRepository {
  private readonly persistence
  constructor () {
    this.persistence = new UserODM()
  }

  async findByEmail (email: string): Promise<AccountModel> {
    const userInDb = await this.persistence.findByEmail(email)
    if (userInDb == null) throw new NotFoundError("Can't find user in db")

    const accountDTO = {
      id: userInDb._id,
      name: userInDb.name,
      email: userInDb.email,
      password: userInDb.password
    }

    return accountDTO
  }
}
