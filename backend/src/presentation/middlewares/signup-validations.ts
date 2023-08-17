import { type NextFunction, type Request, type Response } from 'express'
import { NotFoundError } from '../helpers/http-erros'

const validations = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const properties = ['name', 'email', 'password', 'passwordConfirmation']

    if (!properties.every((property) => property in req.body)) {
      next(new NotFoundError('Property not found in the request'))
    }
  } catch (error) {
    next(error)
  }
}
