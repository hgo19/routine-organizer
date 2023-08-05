import { UserAccount } from '../entities/UserAccount'
import { AddAccountUseCase } from './add-account'

describe('', () => {
  test('should creates the UserAccount entity in the use case', async () => {
    // System under test
    const userEntity = new UserAccount()
    const sut = new AddAccountUseCase(userEntity)
    const createUserSpy = jest.spyOn(userEntity, 'createUser')
    const accountInput = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      passwordConfirmation: 'invalid_password'
    }

    await sut.add(accountInput)

    expect(createUserSpy).toHaveBeenCalledWith(accountInput)
  })
})
