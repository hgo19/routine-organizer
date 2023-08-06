import { type UserAccount } from '../entities/UserAccount'
import { type AccountInput, type AccountModel, type Encrypter, type AddAccountRepository } from '../protocols'

export class AddAccountUseCase {
  private readonly userEntity
  private readonly encrypter
  private readonly repository

  constructor (userEntity: UserAccount, encrypter: Encrypter, repository: AddAccountRepository) {
    this.userEntity = userEntity
    this.encrypter = encrypter
    this.repository = repository
  }

  async add (account: AccountInput): Promise<AccountModel> {
    this.userEntity.create(account)
    const hashedPasword = await this.encrypter.encrypt(this.userEntity.password)
    const accountData = {
      name: this.userEntity.name,
      email: this.userEntity.email,
      password: hashedPasword
    }
    const createdAccount = await this.repository.create(accountData)

    return createdAccount
  }
}
