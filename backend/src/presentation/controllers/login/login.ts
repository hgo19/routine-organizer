import { type NextFunction, type Request, type Response } from 'express'
import { type Authentication } from '../../../domain/usecases/authentication'

export class LoginController {
  private readonly useCase
  constructor (usecase: Authentication) {
    this.useCase = usecase
  }

  execute = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { email, password } = req.body
      const account = await this.useCase.auth({ email, password })
      return res.status(200).json(account)
    } catch (error) {
      next(error)
    }
  }
}
