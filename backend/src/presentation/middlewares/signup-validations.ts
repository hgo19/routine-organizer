import { type NextFunction, type Request, type Response } from 'express'
import { NotFoundError } from '../helpers/http-erros'

export const userValidations = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const properties = ['name', 'email', 'password', 'passwordConfirmation']

    if (!properties.every((property) => property in req.body)) {
      throw new NotFoundError('Property not found in the request')
    }
    next()
  } catch (error) {
    next(error)
  }
}
