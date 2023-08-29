import { Authentication } from '../../../domain/usecases/authentication'
import { AuthJwt } from '../../../infra/adapters/auth-jwt'
import { EncrypterBcrypt } from '../../../infra/adapters/encrypter-bcrypt'
import { AuthenticationMongooseRepository } from '../../../infra/repositories/AuthenticationMongooseRepository'

const secret = process.env.SECRET ?? 'yoursecret'

export const makeAuthenticationUseCase = (): Authentication => {
  return new Authentication(new AuthenticationMongooseRepository(), new EncrypterBcrypt(), new AuthJwt(secret))
}
