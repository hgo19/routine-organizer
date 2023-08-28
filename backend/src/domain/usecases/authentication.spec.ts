import { type Encrypter, type AccountModel } from '../protocols'
import { type AuthenticationRepository } from '../protocols/authentication-repository'
import { Authentication } from './authentication'

interface SutTypes {
  sut: Authentication
  repository: AuthenticationRepository
  encrypter: Encrypter
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
    async encrypt (password: string): Promise<string> {
      return 'hashed_password'
    }
  }

  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const repository = makeAuthenticationRepoStub()
  const encrypter = makeEncrypterStub()
  const sut = new Authentication(repository, encrypter)

  return {
    repository,
    encrypter,
    sut
  }
}

describe('Authentication use case', () => {
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
    const encryptSpy = jest.spyOn(encrypter, 'encrypt')
    const validInput = {
      email: 'valid@email.com',
      password: 'valid_password'
    }

    await sut.auth(validInput)

    expect(encryptSpy).toHaveBeenCalledWith(validInput.password)
  })
})
