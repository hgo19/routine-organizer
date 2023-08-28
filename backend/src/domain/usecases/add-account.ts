import { type UserAccount } from '../entities/UserAccount'
import { type AccountInput, type AccountOutput, type Encrypter, type AddAccountRepository, type TokenAuthenticator } from '../protocols'

export class AddAccountUseCase {
  private readonly userEntity
  private readonly encrypter
  private readonly repository
  private readonly tokenAuth

  constructor (
    userEntity: UserAccount,
    encrypter: Encrypter,
    repository: AddAccountRepository,
    tokenAuth: TokenAuthenticator
  ) {
    this.userEntity = userEntity
    this.encrypter = encrypter
    this.repository = repository
    this.tokenAuth = tokenAuth
  }

  async add (account: AccountInput): Promise<AccountOutput> {
    this.userEntity.create(account)
    const hashedPasword = await this.encrypter.encrypt(this.userEntity.password)
    const accountData = {
      name: this.userEntity.name,
      email: this.userEntity.email,
      password: hashedPasword
    }

    const token = this.tokenAuth.generate(accountData)
    const createdAccount = await this.repository.create(accountData)

    return { ...createdAccount, token }
  }
}
