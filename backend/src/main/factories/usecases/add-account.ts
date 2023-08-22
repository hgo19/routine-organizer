import { UserAccount } from '../../../domain/entities/UserAccount'
import { AddAccountUseCase } from '../../../domain/usecases/add-account'
import { AuthJwt } from '../../../infra/adapters/auth-jwt'
import { EncrypterBcrypt } from '../../../infra/adapters/encrypter-bcrypt'
import { AddAccountMongooseRepository } from '../../../infra/repositories/AddAccountMongooseRepository'

const secret = process.env.SECRET ?? 'yoursecret'

export const makeAddAccount = (): AddAccountUseCase => {
  return new AddAccountUseCase(new UserAccount(), new EncrypterBcrypt(), new AddAccountMongooseRepository(), new AuthJwt(secret))
}
