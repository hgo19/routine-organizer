import { type AddAccountUseCase } from '../../../domain/usecases/add-account'
import { type AccountInput } from '../../../domain/usecases/add-account-protocols'
import { type HttpResponse, type IController } from '../../protocols'

export class SignUpController implements IController<AccountInput> {
  private readonly _useCase
  constructor (addAccountUseCase: AddAccountUseCase) {
    this._useCase = addAccountUseCase
  }

  async execute (value: Partial<AccountInput>): Promise<HttpResponse> {
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
    await this._useCase.add({ name, email, password, passwordConfirmation })

    return await new Promise(resolve => {
      resolve({
        statusCode: 200,
        body: {}
      })
    })
  }
}
