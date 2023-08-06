import { UserAccount } from '../../../domain/entities/UserAccount'
import { type Encrypter } from '../../../domain/protocols/encrypter'
import { AddAccountUseCase } from '../../../domain/usecases/add-account'
import { type AccountInput, type AccountModel } from '../../../domain/usecases/add-account-protocols'
import { SignUpController } from './signup'

interface SutTypes {
  sut: SignUpController
  addAccountUseCase: AddAccountUseCase
}

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (password: string): Promise<string> {
      return 'hashed_password'
    }
  }

  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  class AddAccountUseCaseStub extends AddAccountUseCase {
    async add (account: AccountInput): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: account.name,
        email: account.email,
        password: 'hashed_password'
      }

      return await new Promise(resolve => { resolve(fakeAccount) })
    }
  }
  const userEntity = new UserAccount()
  const ecrypter = makeEncrypterStub()
  const addAccountUseCase = new AddAccountUseCaseStub(userEntity, ecrypter)
  const sut = new SignUpController(addAccountUseCase)

  return {
    sut,
    addAccountUseCase
  }
}

describe('SignUp Controller', () => {
  const { sut, addAccountUseCase } = makeSut()

  test('should return 400 if a property is missing', async () => {
    // System under test
    const bodyMissingProperties = [
      {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      },
      {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      },
      {
        name: 'any_name',
        email: 'any_email',
        passwordConfirmation: 'any_password_confirmation'
      },
      {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    ]

    const promises = bodyMissingProperties.map(async (bodyReq: Partial<AccountInput>) => {
      const httpResponse = await sut.execute(bodyReq)
      expect(httpResponse.statusCode).toBe(400)
    })

    // Use Promise.all to wait for all promises to resolve
    await Promise.all(promises)
  })

  test('should ensure AddAccountUseCase was called with the right values', async () => {
    // System under test
    const addSpy = jest.spyOn(addAccountUseCase, 'add')
    const bodyRequest = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password',
      passwordConfirmation: 'valid_confirmation'
    }

    await sut.execute(bodyRequest)
    expect(addSpy).toHaveBeenCalledWith(bodyRequest)
  })
})
