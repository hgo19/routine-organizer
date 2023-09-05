import { type Encrypter, type AccountModel, type TokenAuthenticator, type AccountBasic } from '../protocols'
import { type AuthenticationRepository } from '../protocols/authentication-repository'
import { Authentication } from './authentication'

interface SutTypes {
  sut: Authentication
  repository: AuthenticationRepository
  encrypter: Encrypter
  tokenAuth: TokenAuthenticator
}

const makeAuthenticationRepoStub = (): AuthenticationRepository => {
  class AtuhenticationRepositoryStub implements AuthenticationRepository {
    async findByEmail (): Promise<AccountModel> {
      const fakeUser = {
        id: '1',
        name: 'valid_name',
        email: 'valid@email.com',
        password: 'hashed_password'
      }
      return await new Promise(resolve => { resolve(fakeUser) })
    }
  }
  return new AtuhenticationRepositoryStub()
}

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'hashed_password'
    }

    async testPassword (password: string, hashedPassword: string): Promise<boolean> {
      return true
    }
  }

  return new EncrypterStub()
}

const makeTokenAuthenticatorStub = (): TokenAuthenticator => {
  class TokenAuthenticatorStub implements TokenAuthenticator {
    generate (payload: AccountBasic): string {
      return 'generated_token'
    }
  }

  return new TokenAuthenticatorStub()
}

const makeSut = (): SutTypes => {
  const repository = makeAuthenticationRepoStub()
  const encrypter = makeEncrypterStub()
  const tokenAuth = makeTokenAuthenticatorStub()
  const sut = new Authentication(repository, encrypter, tokenAuth)

  return {
    repository,
    encrypter,
    tokenAuth,
    sut
  }
}

describe('Authentication use case', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  test('should ensure repository method findByEmail was called with the right values', async () => {
    // System under test
    const { sut, repository } = makeSut()
    const findSpy = jest.spyOn(repository, 'findByEmail')
    const validInput = {
      email: 'valid@email.com',
      password: 'valid_password'
    }

    await sut.auth(validInput)
    expect(findSpy).toHaveBeenCalledWith(validInput.email)
  })

  test('should throws an error if repository throw', async () => {
    // System under test
    const { sut, repository } = makeSut()
    jest.spyOn(repository, 'findByEmail').mockImplementation(() => { throw new Error() })
    const invalidInput = {
      email: 'invalid@email.com',
      password: 'valid_password'
    }
    await expect(sut.auth(invalidInput)).rejects.toThrow()
  })

  test('ensure encrypter was called with the right value', async () => {
    // System under test
    const { sut, encrypter } = makeSut()
    const encryptSpy = jest.spyOn(encrypter, 'testPassword')
    const validInput = {
      email: 'valid@email.com',
      password: 'valid_password'
    }

    await sut.auth(validInput)

    expect(encryptSpy).toHaveBeenCalledWith(validInput.password, 'hashed_password')
  })

  test("ensure the Authentication use case throws if the password on input and the password in db aren't the same ", async () => {
    // System under test
    const { sut, encrypter } = makeSut()
    const encrypterSpy = jest.spyOn(encrypter, 'testPassword')
    encrypterSpy.mockResolvedValue(Promise.resolve(false))
    const invalidInput = {
      email: 'valid@email.com',
      password: 'invalid_password'
    }

    await expect(sut.auth(invalidInput)).rejects.toThrow()
  })

  test('ensure TokenAuthenticator was called with the right value', async () => {
    // System under test
    const { sut, tokenAuth } = makeSut()
    const tokenAuthSpy = jest.spyOn(tokenAuth, 'generate')
    const validInput = {
      email: 'valid@email.com',
      password: 'valid_password'
    }

    await sut.auth(validInput)

    expect(tokenAuthSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid@email.com',
      password: 'hashed_password'
    })
  })

  test('should return an object with name, email and token on success', async () => {
    // System under test
    const { sut } = makeSut()
    const validInput = {
      email: 'valid@email.com',
      password: 'valid_password'
    }

    const response = await sut.auth(validInput)

    expect(response).toEqual({
      name: 'valid_name',
      email: 'valid@email.com',
      token: 'generated_token'
    })
  })
})
