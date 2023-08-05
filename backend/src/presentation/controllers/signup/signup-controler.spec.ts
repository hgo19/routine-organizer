import { SignUpController, type SignUpRequest } from './signup'

describe('SignUp Controller', () => {
  test('should return 400 if a property is missing', async () => {
    // System under test
    const sut = new SignUpController()
    const bodyMissingProperties = [
      {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      },
      {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password_confirmation'
      },
      {
        name: 'any_name',
        email: 'any_email',
        passwordConfirmation: 'any_password_confirmation'
      },
      {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    ]

    const promises = bodyMissingProperties.map(async (bodyReq: Partial<SignUpRequest>) => {
      const httpResponse = await sut.execute(bodyReq)
      expect(httpResponse.statusCode).toBe(400)
    })

    // Use Promise.all to wait for all promises to resolve
    await Promise.all(promises)
  })
})
