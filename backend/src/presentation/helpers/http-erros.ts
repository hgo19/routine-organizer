export class NotFoundError extends Error {
  public statusCode: number
  constructor (message: string) {
    super(message)
    this.name = 'Not Found'
    this.statusCode = 404
  }
}
