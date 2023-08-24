import { type NextFunction, type Request, type Response } from 'express'
import { type AddAccountUseCase } from '../../../domain/usecases/add-account'

export class SignUpController {
  private readonly useCase
  constructor (addAccountUseCase: AddAccountUseCase) {
    this.useCase = addAccountUseCase
  }

  execute = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { name, email, password, passwordConfirmation } = req.body
      const userCreated = await this.useCase.add({ name, email, password, passwordConfirmation })

      return res.status(201).json(userCreated)
    } catch (error) {
      next(error)
    }
  }
}
