import { InvalidParamsError } from '../../../domain/exceptions/invalid-params'
import { TypeError } from '../../../domain/exceptions/type'
import { type AddAccountUseCase } from '../../../domain/usecases/add-account'
import { type HttpResponse, type IController, type AccountInput } from './signup-protocols'

export class SignUpController implements IController<AccountInput> {
  private readonly _useCase
  constructor (addAccountUseCase: AddAccountUseCase) {
    this._useCase = addAccountUseCase
  }

  async execute (value: Partial<AccountInput>): Promise<HttpResponse> {
    try {
      const properties = ['name', 'email', 'password', 'passwordConfirmation']

      if (!properties.every((property) => property in value)) {
        const response = {
          statusCode: 400,
          body: {}
        }
        return await new Promise(resolve => { resolve(response) })
      }

      const name = value.name as string
      const email = value.email as string
      const password = value.password as string
      const passwordConfirmation = value.passwordConfirmation as string
      const userReturn = await this._useCase.add({ name, email, password, passwordConfirmation })

      return await new Promise(resolve => {
        resolve({
          statusCode: 201,
          body: userReturn
        })
      })
    } catch (error) {
      if (error instanceof InvalidParamsError || error instanceof TypeError) {
        return {
          statusCode: 422,
          body: {
            message: error.message
          }
        }
      }
      console.log(error)
      return {
        statusCode: 500,
        body: {
          message: 'Internal Server Error'
        }
      }
    }
  }
}
