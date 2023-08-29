export interface Encrypter {
  encrypt: (value: string) => Promise<string>
  testPassword: (password: string, hashedPassword: string) => Promise<boolean>
}
