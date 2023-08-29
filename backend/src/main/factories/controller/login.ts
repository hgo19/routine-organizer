import { LoginController } from '../../../presentation/controllers/login/login'
import { makeAuthenticationUseCase } from '../usecases/authentication'

export const makeLoginController = new LoginController(makeAuthenticationUseCase())
