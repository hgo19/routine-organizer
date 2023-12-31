import { UserAccount } from '../entities/UserAccount'
import { AddAccountUseCase } from './add-account'
import { type AccountModel, type Encrypter, type AddAccountRepository, type AccountBasic, type TokenAuthenticator } from '../protocols'

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
    async testPassword (password: string, hashedPassword: string): Promise<boolean> {
      return true
    }

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
    generate (payload: AccountBasic): string {
      return 'generated_token'
    }
  }

  return new TokenAuthenticatorStub()
}

interface SutTypes {
  sut: AddAccountUseCase
  userEntity: UserAccount
  encrypter: Encrypter
  accountRepository: AddAccountRepository
  tokenAuth: TokenAuthenticator
}

const makeSut = (): SutTypes => {
  const userEntity = makeEntityStub()
  const encrypter = makeEncrypterStub()
  const accountRepository = makeRepositoryStub()
  const tokenAuth = makeTokenAuthenticatorStub()
  const sut = new AddAccountUseCase(userEntity, encrypter, accountRepository, tokenAuth)

  return {
    sut,
    userEntity,
    encrypter,
    accountRepository,
    tokenAuth
  }
}

describe('AddAccount use case', () => {
  test('1. Should creates the UserAccount entity in the use case', async () => {
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

  test('2. Should throw an error if there is some troubles in business validations', async () => {
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

  test('3. Should calls an Encrypter with the right values', async () => {
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

  test('4. Should throws if Encrypter throw', async () => {
    // System under test
    const { sut, encrypter } = makeSut()
    jest.spyOn(encrypter, 'encrypt').mockImplementation(() => { throw new Error() })
    const accountInput = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      passwordConfirmation: 'invalid_password'
    }
    await expect(sut.add(accountInput)).rejects.toThrow()
  })

  test('5. Should calls the Repository with the right values', async () => {
    // System under test
    const { sut, accountRepository } = makeSut()
    const createRepositorySpy = jest.spyOn(accountRepository, 'create')
    const accountInput = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      passwordConfirmation: 'invalid_password'
    }
    await sut.add(accountInput)
    expect(createRepositorySpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('6. Should throws if Repository throw', async () => {
    // System under test
    const { sut, accountRepository } = makeSut()
    jest.spyOn(accountRepository, 'create').mockImplementation(() => { throw new Error() })
    const accountInput = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      passwordConfirmation: 'invalid_password'
    }
    await expect(sut.add(accountInput)).rejects.toThrow()
  })

  test('7. Should calls the TokenAuthenticator with the right values', async () => {
    // System under test
    const { sut, tokenAuth } = makeSut()
    const generateTokenSpy = jest.spyOn(tokenAuth, 'generate')
    const accountInput = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      passwordConfirmation: 'invalid_password'
    }
    await sut.add(accountInput)
    expect(generateTokenSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('8. Should throws if TokenAuthenticator throw', async () => {
    // System under test
    const { sut, tokenAuth } = makeSut()
    jest.spyOn(tokenAuth, 'generate').mockImplementation(() => { throw new Error() })
    const accountInput = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      passwordConfirmation: 'invalid_password'
    }
    await expect(sut.add(accountInput)).rejects.toThrow()
  })

  test('9. Should returns the created Account correctly', async () => {
    // System under test
    const { sut } = makeSut()
    const accountInput = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      passwordConfirmation: 'invalid_password'
    }
    const createdAccount = await sut.add(accountInput)
    expect(createdAccount).toEqual({
      name: 'valid_name',
      email: 'valid_email',
      token: 'generated_token'
    })
  })
})
