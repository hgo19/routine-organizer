import { type NextFunction, type Request, type Response } from 'express'
import { InvalidParamsError } from '../../domain/exceptions/invalid-params'
import { AbstractHttpError, BadRequestError, InternalServerError } from '../helpers/http-erros'
import { TypeError } from '../../domain/exceptions/type'
import { AuthenticationError } from '../../domain/exceptions/authentication-error'

export const errorTreatment = (error: Error, _req: Request, _res: Response, next: NextFunction): any => {
  if (error instanceof InvalidParamsError || error instanceof TypeError) {
    next(new BadRequestError(error.message))
  } else if (error instanceof AuthenticationError) {
    next(new BadRequestError(error.message))
  } else if (error instanceof AbstractHttpError) {
    next(error)
  } else {
    console.log(error)
    next(new InternalServerError('Unexpected Error Happend'))
  }
}

export const errorHandler = (error: AbstractHttpError, _req: Request, res: Response, _next: NextFunction): any => {
  const { message, statusCode } = error
  return res.status(statusCode).json({ error: message })
}
