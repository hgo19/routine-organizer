import { type NextFunction, type Request, type Response } from 'express'
import { type AddAccountUseCase } from '../../../domain/usecases/add-account'
import { type IController } from './signup-protocols'

export class SignUpController implements IController {
  private readonly _useCase
  constructor (addAccountUseCase: AddAccountUseCase) {
    this._useCase = addAccountUseCase
  }

  execute = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { name, email, password, passwordConfirmation } = req.body
      const userCreated = await this._useCase.add({ name, email, password, passwordConfirmation })

      return res.status(201).json(userCreated)
    } catch (error) {
      next(error)
    }
  }
}
