import { Router } from 'express'
import { makeSignUpController } from '../factories/controller/signup'
import { userValidations } from '../../presentation/middlewares/signup-validations'

const userRoute = Router()

userRoute.post('/', userValidations, makeSignUpController.execute)

export default userRoute
