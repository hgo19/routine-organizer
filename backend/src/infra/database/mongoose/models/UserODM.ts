import {
  Schema
} from 'mongoose'
import { type AccountModel } from '../../../../domain/protocols'
import AbstractODM from './AbstractODM'

class UserODM extends AbstractODM<AccountModel> {
  constructor () {
    const schema = new Schema<AccountModel>({
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true }
    }, {
      versionKey: false // You should be aware of the outcome after set to false
    })
    super(schema, 'User')
  }

  public async findByEmail (email: string): Promise<any> {
    return await this.model.findOne({ email })
  }
}

export default UserODM
