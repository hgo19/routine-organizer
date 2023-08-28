import { type AccountModel } from './account'

export interface AuthenticationRepository {
  findByEmail: (email: string) => Promise<AccountModel>
}
