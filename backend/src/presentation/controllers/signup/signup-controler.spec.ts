import { UserAccount } from '../../../domain/entities/UserAccount'
import { AddAccountUseCase } from '../../../domain/usecases/add-account'
import { type AccountBasic, type AccountInput, type AccountModel, type Encrypter, type AddAccountRepository, type TokenAuthenticator } from '../../../domain/protocols'
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

const makeRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async create (account: AccountBasic): Promise<AccountModel> {
      return {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password'
      }
    }
  }

  return new AddAccountRepositoryStub()
}

const makeTokenAuthenticatorStub = (): TokenAuthenticator => {
  class TokenAuthenticatorStub implements TokenAuthenticator {
    async generate (payload: AccountBasic): Promise<string> {
      return await new Promise(resolve => { resolve('generated_token') })
    }
  }

  return new TokenAuthenticatorStub()
}

const makeSut = (): SutTypes => {
  class AddAccountUseCaseStub extends AddAccountUseCase {
    async add (account: AccountInput): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: account.name,
        email: account.email,
        password: 'hashed_password',
        token: 'generated_token'
      }

      return await new Promise(resolve => { resolve(fakeAccount) })
    }
  }
  const userEntity = new UserAccount()
  const ecrypter = makeEncrypterStub()
  const repository = makeRepositoryStub()
  const tokenAuth = makeTokenAuthenticatorStub()
  const addAccountUseCase = new AddAccountUseCaseStub(userEntity, ecrypter, repository, tokenAuth)
  const sut = new SignUpController(addAccountUseCase)

  return {
    sut,
    addAccountUseCase
  }
}

describe('SignUp Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return 400 if a property is missing', async () => {
    // System under test
    const { sut } = makeSut()
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

  test('should returns an http error if AddAccountUseCase throws', async () => {
    // System under test
    const { sut, addAccountUseCase } = makeSut()
    jest.spyOn(addAccountUseCase, 'add').mockImplementation(() => { throw new Error() })
    const bodyRequest = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password',
      passwordConfirmation: 'valid_confirmation'
    }

    const response = await sut.execute(bodyRequest)

    expect(response).toEqual({
      statusCode: 500,
      body: {
        message: 'Internal Server Error'
      }
    })
  })

  test('should ensure AddAccountUseCase was called with the right values', async () => {
    // System under test
    const { sut, addAccountUseCase } = makeSut()
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

  test('should return a http response with the right infos on success', async () => {
    // System under test
    const { sut } = makeSut()
    const bodyRequest = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password',
      passwordConfirmation: 'valid_confirmation'
    }
    const response = await sut.execute(bodyRequest)
    expect(response).toEqual({
      statusCode: 201,
      body: {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'hashed_password',
        token: 'generated_token'
      }
    })
  })
})
