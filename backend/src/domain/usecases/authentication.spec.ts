import { type AccountModel } from '../protocols'
import { type AuthenticationRepository } from '../protocols/authentication-repository'
import { Authentication } from './authentication'

interface SutTypes {
  sut: Authentication
  repository: AuthenticationRepository
}
const makeSut = (): SutTypes => {
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
  const repository = new AtuhenticationRepositoryStub()
  const sut = new Authentication(repository)

  return {
    repository,
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
      password: 'valid@password'
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
      password: 'valid@password'
    }
    await expect(sut.auth(invalidInput)).rejects.toThrow()
  })
})
