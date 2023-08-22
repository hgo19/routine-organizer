import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { makeAddAccount } from '../usecases/add-account'

export const makeSignUp = (): SignUpController => {
  return new SignUpController(makeAddAccount())
}
