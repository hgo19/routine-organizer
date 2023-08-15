import { type Encrypter } from '../../domain/protocols'
import bcrypt from 'bcrypt'

export class EncrypterBcrypt implements Encrypter {
  async encrypt (value: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(value, 12)
    return hashedPassword
  }
}
