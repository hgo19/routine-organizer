import { type UserAccount } from '../entities/UserAccount'
import { type Encrypter } from '../protocols/encrypter'
import { type AccountInput, type AccountModel } from './add-account-protocols'

export class AddAccountUseCase {
  private readonly userEntity
  private readonly encrypter
  constructor (userEntity: UserAccount, encrypter: Encrypter) {
    this.userEntity = userEntity
    this.encrypter = encrypter
  }

  async add (account: AccountInput): Promise<AccountModel> {
    this.userEntity.create(account)

    const hashedPasword = await this.encrypter.encrypt(this.userEntity.password)

    const fakeAccount = {
      id: 'valid_id',
      name: account.name,
      email: account.email,
      password: 'hashed_password'
    }

    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}
