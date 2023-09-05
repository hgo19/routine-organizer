export interface AccountBasic {
  name: string
  email: string
  password: string
}

export interface AccountInput extends AccountBasic {
  passwordConfirmation: string
}

export interface AccountModel extends AccountBasic {
  id?: string
}

export interface AccountOutput {
  name: string
  email: string
  token: string
}
