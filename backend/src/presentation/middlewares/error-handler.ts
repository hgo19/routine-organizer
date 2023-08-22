import { type NextFunction, type Request, type Response } from 'express'
import { InvalidParamsError } from '../../domain/exceptions/invalid-params'
import { type AbstractHttpError, BadRequestError, InternalServerError } from '../helpers/http-erros'
import { TypeError } from '../../domain/exceptions/type'

export const errorTreatment = (error: Error, _req: Request, _res: Response, next: NextFunction): any => {
  if (error instanceof InvalidParamsError) {
    next(new BadRequestError('Invalid Params!'))
  } else if (error instanceof TypeError) {
    next(new BadRequestError('Invalid parameters types!'))
  } else {
    next(new InternalServerError('Unexpected Error Happend'))
  }
}

export const errorHandler = (error: AbstractHttpError, _req: Request, res: Response, _next: NextFunction): any => {
  const { message, statusCode } = error
  return res.status(statusCode).json({ error: message })
}
