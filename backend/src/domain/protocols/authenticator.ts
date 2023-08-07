import { type AccountBasic } from './account'

export interface TokenAuthenticator {
  generate: (payload: AccountBasic) => Promise<string>
}
