export abstract class AbstractHttpError extends Error {
  public statusCode: number
  constructor (message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class NotFoundError extends AbstractHttpError {
  constructor (message: string) {
    super(message, 404)
    this.name = 'Not Found'
  }
}

export class BadRequestError extends AbstractHttpError {
  constructor (message: string) {
    super(message, 400)
    this.name = 'Bad Request'
  }
}

export class InternalServerError extends AbstractHttpError {
  constructor (message: string) {
    super(message, 500)
    this.name = 'Internal Server Error'
  }
}
