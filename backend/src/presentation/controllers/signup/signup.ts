import { type HttpResponse, type IController } from '../../protocols'

export interface SignUpRequest {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export class SignUpController implements IController<SignUpRequest> {
  async execute (value: Partial<SignUpRequest>): Promise<HttpResponse> {
    const properties = ['name', 'email', 'password', 'passwordConfirmation']

    if (!properties.every((property) => property in value)) {
      const response = {
        statusCode: 400,
        body: {}
      }
      return await new Promise(resolve => { resolve(response) })
    }

    return await new Promise(resolve => {
      resolve({
        statusCode: 200,
        body: {}
      })
    })
  }
}
