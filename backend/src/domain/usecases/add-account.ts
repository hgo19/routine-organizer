import { type AccountInput, type AccountModel } from './add-account-protocols'

export class AddAccountUseCase {
  async add (account: AccountInput): Promise<AccountModel> {
    const fakeAccount = {
      id: 'valid_id',
      name: account.name,
      email: account.email,
      password: account.password
    }

    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}
