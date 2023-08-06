import { UserAccount } from '../entities/UserAccount'
import { AddAccountUseCase } from './add-account'
import { type AccountInput } from './add-account-protocols'
import { type Encrypter } from '../protocols/encrypter'

const makeEntityStub = (): UserAccount => {
  class UserEntityStub extends UserAccount {
    validations (): boolean {
      return true
    }
  }

  return new UserEntityStub()
}

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (password: string): Promise<string> {
      return 'hashed_password'
    }
  }

  return new EncrypterStub()
}

interface SutTypes {
  sut: AddAccountUseCase
  userEntity: UserAccount
  encrypter: Encrypter
}

const makeSut = (): SutTypes => {
  const userEntity = makeEntityStub()
  const encrypter = makeEncrypterStub()
  const sut = new AddAccountUseCase(userEntity, encrypter)

  return {
    sut,
    userEntity,
    encrypter
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

  test('should calls an Encrypter with the right values', async () => {
    // System under test
    const { sut, encrypter } = makeSut()
    const encryptSpyt = jest.spyOn(encrypter, 'encrypt')
    const accountInput = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      passwordConfirmation: 'invalid_password'
    }
    await sut.add(accountInput)
    expect(encryptSpyt).toHaveBeenCalledWith(accountInput.password)
  })
})
