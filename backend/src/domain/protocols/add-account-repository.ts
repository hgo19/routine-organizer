import { type AccountBasic, type AccountModel } from '../usecases/add-account-protocols'

export interface AddAccountRepository {
  create: (account: AccountBasic) => Promise<AccountModel>
}
