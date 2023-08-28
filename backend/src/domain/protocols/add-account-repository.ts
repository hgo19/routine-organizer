import { type AccountBasic, type AccountModel } from './account'
export interface AddAccountRepository {
  create: (account: AccountBasic) => Promise<AccountModel>
}
