import { Router } from 'express'
import { makeSignUpController } from '../factories/controller/signup'
import { userValidations } from '../../presentation/middlewares/signup-validations'
import { makeLoginController } from '../factories/controller/login'

const userRoute = Router()

userRoute.post('/register', userValidations, makeSignUpController.execute)

userRoute.post('/login', makeLoginController.execute)

export default userRoute
