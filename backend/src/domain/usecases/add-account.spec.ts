import { UserAccount } from '../entities/UserAccount'
import { AddAccountUseCase } from './add-account'
import { type AccountInput } from './add-account-protocols'

interface SutTypes {
  sut: AddAccountUseCase
  userEntity: UserAccount
}

const makeSut = (): SutTypes => {
  class UserEntityStub extends UserAccount {
    create (userInfo: AccountInput): boolean {
      return true
    }

    validations (): boolean {
      throw new Error()
    }
  }

  const userEntity = new UserEntityStub()
  const sut = new AddAccountUseCase(userEntity)

  return {
    sut,
    userEntity
  }
}

describe('', () => {
  test('should creates the UserAccount entity in the use case', async () => {
    // System under test
    const { sut, userEntity } = makeSut()
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
    const { sut, userEntity } = makeSut()
    jest.spyOn(userEntity, 'create').mockImplementation(() => { throw new Error() })
    const accountInput = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      passwordConfirmation: 'invalid_password'
    }

    await expect(sut.add(accountInput)).rejects.toThrow()
  })
})
