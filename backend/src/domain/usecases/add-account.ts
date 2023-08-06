import { type UserAccount } from '../entities/UserAccount'
import { type AccountInput, type AccountModel } from './add-account-protocols'

export class AddAccountUseCase {
  private readonly userEntity
  constructor (userEntity: UserAccount) {
    this.userEntity = userEntity
  }

  async add (account: AccountInput): Promise<AccountModel> {
    this.userEntity.create(account)
    const fakeAccount = {
      id: 'valid_id',
      name: account.name,
      email: account.email,
      password: 'hashed_password'
    }

    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}
