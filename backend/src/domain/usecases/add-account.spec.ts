import { UserAccount } from '../entities/UserAccount'
import { AddAccountUseCase } from './add-account'

describe('', () => {
  test('should creates the UserAccount entity in the use case', async () => {
    // System under test
    const userEntity = new UserAccount()
    const sut = new AddAccountUseCase(userEntity)
    const createUserSpy = jest.spyOn(userEntity, 'create')
    const accountInput = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      passwordConfirmation: 'valid_password'
    }

    await sut.add(accountInput)

    expect(createUserSpy).toHaveBeenCalledWith(accountInput)
  })

  test('should throw an error if there is some troubles in business validations', async () => {
    class UserEntityStub extends UserAccount {
      validations (): boolean {
        throw new Error()
      }
    }

    const userEntity = new UserEntityStub()
    const sut = new AddAccountUseCase(userEntity)
    const accountInput = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      passwordConfirmation: 'invalid_password'
    }

    await expect(sut.add(accountInput)).rejects.toThrow()
  })
})
