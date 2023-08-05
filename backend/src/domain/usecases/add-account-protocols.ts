export interface AccountInput {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface AccountModel {
  id: string
  name: string
  email: string
  password: string
}
