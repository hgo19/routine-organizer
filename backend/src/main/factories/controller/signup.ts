import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { makeAddAccount } from '../usecases/add-account'

export const makeSignUpController = new SignUpController(makeAddAccount())
