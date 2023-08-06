import { UserAccount } from './UserAccount'

describe('UserAccount Entity', () => {
  test('should throws an error when u try to create an User with invalid infos', () => {
    // System under test
    const sut = new UserAccount()
    const invalidUsers = [
      {
        name: '',
        email: 'valid_email@email.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      },
      {
        name: 'valid_name',
        email: '',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      },
      {
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: '',
        passwordConfirmation: 'valid_password'
      },
      {
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
        passwordConfirmation: ''
      }
    ]

    invalidUsers.forEach((userInfo) => {
      expect(() => sut.create(userInfo)).toThrow()
    })
  })
})
