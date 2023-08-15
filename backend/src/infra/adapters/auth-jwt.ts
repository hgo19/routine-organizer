import { type AccountBasic, type TokenAuthenticator } from '../../domain/protocols'
import jwt from 'jsonwebtoken'

export class AuthJwt implements TokenAuthenticator {
  private readonly secret: string
  constructor (secret: string) {
    this.secret = secret
  }

  generate (payload: AccountBasic): string {
    const generatedToken = jwt.sign(payload, this.secret, { expiresIn: '2h', algorithm: 'RS256' })
    return generatedToken
  }
}
