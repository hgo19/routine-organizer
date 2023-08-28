import { type AccountModel } from '../protocols'
import { type AuthenticationRepository } from '../protocols/authentication-repository'
import { Authentication } from './authentication'

describe('Authentication use case', () => {
  test('should ensure repository method findByEmail was called with the right values', async () => {
    // System under test
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
    const findSpy = jest.spyOn(repository, 'findByEmail')
    const loginInput = {
      email: 'valid@email.com',
      password: 'valid@password'
    }

    await sut.auth(loginInput)
    expect(findSpy).toHaveBeenCalledWith(loginInput.email)
  })
})
