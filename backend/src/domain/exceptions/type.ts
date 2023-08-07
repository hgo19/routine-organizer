export class TypeError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'Invalid Parameters'
  }
}
