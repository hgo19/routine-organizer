import { type AccountModel, type AccountBasic, type AddAccountRepository } from '../../domain/protocols'
import UserODM from '../database/mongoose/models/UserODM'

export class AddAccountMongooseRepository implements AddAccountRepository {
  private readonly persistence: UserODM
  constructor () {
    this.persistence = new UserODM()
  }

  async create (account: AccountBasic): Promise<AccountModel> {
    return await this.persistence.create(account)
  }
}
